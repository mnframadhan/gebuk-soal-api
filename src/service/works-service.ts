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
        const response = { remaining_limit: student.quota, membership: student.membership };
        return response;
    }

    static async getWorks(
        student: Student,
        category: string,
        page: number
    ): Promise<{ pagination: Paging; data: any }> {
        const pagination: Paging = {
            size: 1,
            total_page: student.quota,
            current_page: page,
        };

        if (category === "none") {
            const soals = await getSoalWithExcludedIds(student.username);

			if(!soals) {
				throw new ResponseError(404, "Sudah Habis")
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

        await prismaClient.student.update({
            where: {
                id: student.id,
            },
            data: {
                n_soal: student.n_soal + 1,
                points: student.points + 10,
                quota: student.quota - 1,
            },
        });

        const current_soal = await prismaClient.soal.findUnique({
            where: {
                id: soal_id,
            },
        });

        updateStudentNSoal(student.id, current_soal?.category!);
        updateStudentNSoalBySubCategory(student.id, currentSoal?.sub_category!);
        updateStudentNSoalByCPNSCategory(student.id, currentSoal?.cpns_category!);

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

    static async getWorksDateStreak(student: Student): Promise<any> {
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
                dates.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
            }

            return dates.reverse(); // Order dates from earliest to latest
        };

        // Map dateCountsArray into an object for easier lookup
        const countsMap: Record<string, number> = dateCountsArray.reduce((acc, obj) => {
            const date = Object.keys(obj)[0];
            acc[date] = obj[date];
            return acc;
        }, {});

        const filledDateCounts = generateDateRange(15).map((date) => {
            return { [date]: countsMap[date] || 0 };
        });

        const data = { streak: dates, data: filledDateCounts };

        return data;
    }
}
