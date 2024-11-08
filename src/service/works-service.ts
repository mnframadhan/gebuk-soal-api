import { Student } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { prismaClient } from "../application/database";
import { getSoalWithExcludedIds, getSoalWithExcludedIdsbyCat } from "../helpers/get-soal-works";
import { Paging } from "../model/pages";
import {
    ResultsResponse,
    toWorkResponse,
    toWorksResultsResponse,
    WorksRequest,
    WorksResultsResponse,
} from "../model/works-model";
import {
    updateStudentNSoal,
    updateStudentNSoalBySubCategory,
    updateStudentNSoalByCPNSCategory,
} from "../helpers/create-works-update";
import { ResponseError } from "../error/response-error";

export class WorksService {
    static async getRemainingLimit(student: Student): Promise<{ remaining_limit: number; membership: string }> {
        const response = { remaining_limit: student.quota!, membership: student.membership };
        return response;
    }

    static async getWorks(
        student: Student,
        category: string,
        page: number
    ): Promise<{ pagination: Paging; data: any }> {
        const pagination: Paging = {
            size: 1,
            total_page: student.quota!,
            current_page: page,
        };

        if (category === "none") {
            const soals = await getSoalWithExcludedIds(student.username);

            if (!soals) {
                throw new ResponseError(404, "Sudah Habis");
            }
            return { pagination: pagination, data: [soals] };
        } else if (category != "none") {
            const soals = await getSoalWithExcludedIdsbyCat(student.username, category!);
            return { pagination: pagination, data: [soals] };
        } else {
            throw new ResponseError(404, "Tidak ada hasil");
        }
    }

    static async createWorks(request: WorksRequest, student: Student, soal_id: string) {
        // get currentSoal
        const currentSoal = await prismaClient.soal.findFirst({
            where: {
                id: soal_id,
            },
        });

        const currentAnswer = currentSoal?.correct_answer as string;

        // set result
        let result: boolean;
        if (request.answer === currentAnswer) {
            result = true;
        } else {
            result = false;
        }

        // prepare
        const works_uuid = String(uuid());
        const created_at = String(Date.now());

        // insert into database
        const works = await prismaClient.work.create({
            data: {
                id: works_uuid,
                ...request,
                username: student.username,
                result: result,
                soal_id: soal_id,
                created_at: created_at,
            },
        });

        if (result) {
            await prismaClient.student.update({
                where: {
                    id: student.id,
                },
                data: {
                    n_soal: student.n_soal + 1,
                    points: student.points + 10,
                    quota: student.quota! - 1,
                },
            });
        } else {
            await prismaClient.student.update({
                where: {
                    id: student.id,
                },
                data: {
                    n_soal: student.n_soal + 1,
                    points: student.points - 10,
                    quota: student.quota! - 1,
                },
            });
        }

        const current_soal = await prismaClient.soal.findUnique({
            where: {
                id: soal_id,
            },
        });

        updateStudentNSoal(student.id, current_soal?.category!, result);
        updateStudentNSoalBySubCategory(student.id, currentSoal?.sub_category!, result);
        updateStudentNSoalByCPNSCategory(student.id, currentSoal?.cpns_category!, result);

        return toWorkResponse(works);
    }

    static async setTodayWorks(student: Student) {
        // get Todays Works
        const today = String(Date.now());
        const tomorrow = String(Date.now() + 86400);

        const works = await prismaClient.work.findMany({
            where: {
                username: student.username,
                created_at: {
                    gte: today, // Greater than or equal to the start of today
                    lt: tomorrow, // Less than the start of tomorrow
                },
            },
            orderBy: {
                created_at: "asc",
            },
        });

        const countTrue: number = works.filter((work) => work.result === true).length;

        // prepare data to insert into result
        const data = {
            id: String(uuid()),
            username: student.username,
            today_works: Number(works.length),
            number_of_true: countTrue,
            number_of_false: works.length - countTrue,
            created_at: String(Date.now()),
        };

        // insert into database
        const response = await prismaClient.result.create({
            data: data,
        });

        return response;
    }

    static async getTodayWorks(student: Student): Promise<ResultsResponse<WorksResultsResponse>> {
        // get Todays Works
        const startOfDay = Math.floor(new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000); // Unix time at 00:00:00
        const endOfDay = Math.floor(new Date(new Date().setHours(23, 59, 59, 999)).getTime() / 1000); // Unix time at 23:59:59

        const works = await prismaClient.work.findMany({
            where: {
                username: student.username,
                created_at: {
                    gte: startOfDay.toString(),
                    lte: endOfDay.toString(),
                },
            },
            orderBy: {
                created_at: "asc",
            },
        });

        const countTrue: number = works.filter((work) => work.result === true).length;

        // prepare data to insert into result
        const data = {
            id: String(uuid()),
            username: student.username,
			membership: student.membership,
            today_works: Number(works.length),
            number_of_true: countTrue,
            number_of_false: works.length - countTrue,
            created_at: String(Date.now()),
        };

        const soalID = works.map((work) => work.soal_id);
        const soals = await prismaClient.soal.findMany({
            where: {
                id: {
                    in: soalID,
                },
            },
        });

        const worksResultsResponse = works.map((w) => {
            const soal = soals.find((s) => s.id === w.soal_id);
            return {
                soal_id: soal?.id,
                label: soal?.label,
                category: soal?.category,
                sub_category: soal?.sub_category,
                text: soal?.text,
                question: soal?.question,
                correct_answer: soal?.correct_answer,
                your_answer: w.answer,
                option1_point: soal?.option1_point,
                option2_point: soal?.option2_point,
                option3_point: soal?.option3_point,
                option4_point: soal?.option4_point,
                option5_point: soal?.option5_point,
                option1: soal?.option1,
                option2: soal?.option2,
                option3: soal?.option3,
                option4: soal?.option4,
                option5: soal?.option5,
                explanation: soal?.explanation,
				explanation_url_youtube_video: soal?.explanation_url_youtube_video,
                created_at: soal?.created_at,
                created_by: soal?.created_by,
            };
        });

        const response: ResultsResponse<WorksResultsResponse> = {
            ...data,
            works: worksResultsResponse as Array<WorksResultsResponse>,
        };

        return toWorksResultsResponse(response);
    }

    static async getDashboardData(student: Student): Promise<any> {
        const createdAt = await prismaClient.work.findMany({
            where: {
                username: student.username,
            },
            select: {
                created_at: true,
                id: true,
            },
        });

        const dateFormat = (epochTime: string) => {
            const date = new Date(Number(epochTime));
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        const dates = createdAt.map((item) => dateFormat(item.created_at));

        const dateCountsArray = Object.entries(
            dates.reduce((acc: Record<string, number>, date: string) => {
                acc[date] = (acc[date] || 0) + 1;
                return acc;
            }, {})
        ).map(([date, count]) => ({ [date]: count }));

        const generateDateRange = (days: number): string[] => {
            const dates: string[] = [];
            const today = new Date();

            for (let i = 0; i < days; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                dates.push(date.toISOString().split("T")[0]);
            }

            return dates.reverse();
        };

        const countsMap: Record<string, number> = dateCountsArray.reduce((acc, obj) => {
            const date = Object.keys(obj)[0];
            acc[date] = obj[date];
            return acc;
        }, {});

        const filledDateCounts = generateDateRange(15).map((date) => {
            return { [date]: countsMap[date] || 0 };
        });

        const uniqueDates = Array.from(new Set(dates)).sort();
        const dateObjects = uniqueDates.map((date) => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0); // Normalize to midnight
            return d;
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const includesToday = dateObjects.some((date) => date.getTime() === today.getTime());
        let maxStreak = 0;
        let streakCount = 1;
        let streakDate = includesToday ? today : new Date(dateObjects[dateObjects.length - 1]);
        let currentStreak = 1;

        for (let i = 1; i < dateObjects.length; i++) {
            const difference = (dateObjects[i].getTime() - dateObjects[i - 1].getTime()) / (1000 * 60 * 60 * 24);

            if (difference === 1) {
                // Consecutive day found, increase streak
                currentStreak++;
            } else {
                // Not consecutive, reset current streak
                maxStreak = Math.max(maxStreak, currentStreak);
                currentStreak = 1;
            }
        }

        for (let i = dateObjects.length - 2; i >= 0; i--) {
            const difference = (streakDate.getTime() - dateObjects[i].getTime()) / (1000 * 60 * 60 * 24);

            if (difference === 1) {
                streakCount++;
                streakDate = dateObjects[i];
            } else {
                break;
            }
        }

        // Radar Chart Data
        const cognitive_data = {
            "Verbal Analogi": student.verbal_analogi < 0 ? 0 : student.verbal_analogi,
            "Verbal Silogisme": student.verbal_silogisme < 0 ? 0 : student.verbal_silogisme,
            "Verbal Analitik": student.verbal_analitik < 0 ? 0 : student.verbal_analitik,
            "Numerik Deret Angka": student.numerik_deret_angka < 0 ? 0 : student.numerik_deret_angka,
            "Numerik Perbandingan Kuantitatif": student.numerik_perbandingan_kuantitatif < 0 ? 0 : student.numerik_perbandingan_kuantitatif,
            "Numerik Soal Cerita": student.numerik_soal_cerita < 0 ? 0 : student.numerik_soal_cerita,
            "Numerik Berhitung": student.numerik_berhitung < 0 ? 0 : student.numerik_berhitung,
        };

		const wawasan_kebangsaan_data = {
			"Nasionalisme" : student.nasionalisme < 0 ? 0 : student.nasionalisme,
			"Integritas" : student.integritas < 0  ? 0 : student.integritas,
			"Pilar Negara" : student.pilar_negara < 0 ? 0 : student.pilar_negara,
			"Bela Negara" : student.bela_negara < 0 ? 0 : student.bela_negara,
			"Bahasa Negara" : student.bahasa_negara < 0 ? 0 : student.bahasa_negara,
		}

		// points change
        const oneWeekAgo = Math.floor(new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000) - 604800; // Unix time at 00:00:00
        const thisDay = Math.floor(new Date(new Date().setHours(23, 59, 59, 999)).getTime() / 1000); // Unix time at 23:59:59

        const worksFromAWeekAgo = await prismaClient.work.findMany({
            where: {
                username: student.username,
                created_at: {
                    gte: oneWeekAgo.toString(),
                    lte: thisDay.toString(),
                },
            },
            orderBy: {
                created_at: "asc",
            },
			select: {
				result: true
			}
        });

		const n_increases = worksFromAWeekAgo.map((item) => item.result ? 1 : 0).filter((item) => item === 1).length * 10;
		const n_decreases = worksFromAWeekAgo.map((item) => item.result ? 1 : 0).filter((item) => item === 0).length * (-10);

		const change = n_increases + n_decreases;
	
        const data = {
            streak: dates,
            n_streak: streakCount,
            max_streak: maxStreak,
            streak_data: filledDateCounts,
            cognitive_data: cognitive_data,
			wawasan_kebangsaan_data: wawasan_kebangsaan_data,
			points_change: change,
        };

        return data;
    }
}
