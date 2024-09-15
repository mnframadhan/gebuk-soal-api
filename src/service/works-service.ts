import { Student } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResultsResponse, toWorkResponse, toWorksResultsResponse, WorksRequest, WorksResultsResponse } from "../model/works-model";
import { v4 as uuid, v4 } from "uuid";
import { ShowedSoalResponse } from "../model/soal-model";
import { Paging } from "../model/pages";
import { toSoalResponsePagination } from "../model/soal-model";
import { updateStudentNSoal } from "../helpers/create-works-update";
import { getSoalWithExcludedIds, getSoalWithExcludedIdsbyCat } from "../helpers/get-soal-works";

export class WorksService {

    static async getRemainingLimit(student: Student): Promise<{ remaining_limit: number, membership: string }> {

        const response = { remaining_limit: student.quota, membership: student.membership }
        return response

    }

    static async getSoalForWorks(category: string, page: number, remaining_limit: number) {


        const pagination: Paging = {
            size: 1,
            total_page: remaining_limit,
            current_page: page
        }

        let soal: ShowedSoalResponse[] = []


        if (category === "TIU") {
            soal = await prismaClient.$queryRaw`
                SELECT * FROM soals
                WHERE category="Tes Intelegensi Umum"
                ORDER BY RAND()
                LIMIT 1`;

            return toSoalResponsePagination(soal.map(({ category, type, label, question, option1, option2, option3, option4, option5, id, text }) => ({ category, type, label, question, option1, option2, option3, option4, option5, id, text })), pagination)

        } else if (category === "TWK") {

            soal = await prismaClient.$queryRaw`
                SELECT * FROM soals
                WHERE category="Tes Wawasan Kebangsaan"
                ORDER BY RAND()
                LIMIT 1`;

            return toSoalResponsePagination(soal.map(({ category, type, label, question, option1, option2, option3, option4, option5, id, text }) => ({ category, type, label, question, option1, option2, option3, option4, option5, id, text })), pagination)

        } else if (!category) {

            soal = await prismaClient.$queryRaw`
                SELECT * FROM soals
                ORDER BY RAND()
                LIMIT 1`;

            return toSoalResponsePagination(soal.map(({ category, type, label, question, option1, option2, option3, option4, option5, id, text }) => ({ category, type, label, question, option1, option2, option3, option4, option5, id, text })), pagination)

        }
    }

    static async getWorks(student: Student, category: string, page: number, remaining_limit: number) {

        const pagination: Paging = {
            size: 1,
            total_page: remaining_limit,
            current_page: page
        }

        if (category==="none") {
            const soals = await getSoalWithExcludedIds(student.username)
            console.log("none")
            return {pagination: pagination, data: [soals]}
        } else {
            console.log("by category")
            const soals = await getSoalWithExcludedIdsbyCat(student.username, category!)
            return {pagination: pagination, data: [soals]}
        }
    }

    static async createWorks(request: WorksRequest, student: Student, soal: string) {

        // get currentSoal
        const currentSoal = await prismaClient.soal.findFirst({
            where: {
                id: soal
            }
        })

        const currentAnswer = currentSoal?.answer as string

        // set result
        let result: boolean;
        if (request.answer === currentAnswer) {
            result = true;
        } else {
            result = false;
        }

        // prepare
        const works_uuid = String(uuid());

        // insert into database
        const works = await prismaClient.work.create({

            data: {
                id: works_uuid,
                ...request,
                username: student.username,
                result: result,
                soal_id: soal
            }
        })

        await prismaClient.student.update({
            where: {
                id: student.id
            },
            data: {
                n_soal: student.n_soal + 1,
                points: student.points + 10,
                quota: student.quota - 1
            }
        });

        const current_soal = await prismaClient.soal.findUnique({
            where: {
                id: soal
            }
        })

        updateStudentNSoal(student.id, current_soal?.category!);

        return toWorkResponse(works);
    }


    static async setTodayWorks(student: Student) {

        // get Todays Works
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        // Set the time to the start of the next day
        tomorrow.setDate(tomorrow.getDate() + 1);

        const works = await prismaClient.work.findMany({
            where: {
                username: student.username,
                created_at: {
                    gte: today,   // Greater than or equal to the start of today
                    lt: tomorrow, // Less than the start of tomorrow
                },
            },
            orderBy: {
                created_at: "asc"
            }
        })

        const countTrue: number = works.filter(work => work.result === true).length

        // prepare data to insert into result
        const data = {
            id: String(v4()),
            username: student.username,
            today_works: Number(works.length),
            number_of_true: countTrue,
            number_of_false: works.length - countTrue,
        }

        // insert into database
        const response = await prismaClient.result.create({
            data: data
        })

        return (response)
    }

    static async getTodayWorks(student: Student): Promise<ResultsResponse<WorksResultsResponse>> {

        // get Todays Works
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        // Set the time to the start of the next day
        tomorrow.setDate(tomorrow.getDate() + 1);

        const works = await prismaClient.work.findMany({
            where: {
                username: student.username,
                created_at: {
                    gte: today,   // Greater than or equal to the start of today
                    lt: tomorrow, // Less than the start of tomorrow
                },
            },
            orderBy: {
                created_at: "asc"
            }
        })

        const countTrue: number = works.filter(work => work.result === true).length

        // prepare data to insert into result
        const data = {
            id: String(v4()),
            username: student.username,
            today_works: Number(works.length),
            number_of_true: countTrue,
            number_of_false: works.length - countTrue,
            created_at: String(Date.now())
        }

        const worksData = await prismaClient.work.findMany({
            where: {
                username: student.username,
                created_at: {
                    gte: today,   // Greater than or equal to the start of today
                    lt: tomorrow, // Less than the start of tomorrow
                },
            },
        });

        const soalID = worksData.map(work => work.soal_id);
        const soals = await prismaClient.soal.findMany({

            where: {
                id: {
                    in: soalID,
                },
            },
        });

        const worksResultsResponse = worksData.map(w => {
            const soal = soals.find(s => s.id === w.soal_id);
            return {
                soal_id: soal?.id,
                label: soal?.label,
                category: soal?.category,
                text: soal?.text,
                question: soal?.question,
                type: soal?.type,
                correct_answer: soal?.answer,
                your_answer: w.answer,
                text2: soal?.text2,
                text3: soal?.text3,
                text4: soal?.text4,
                text5: soal?.text5,
                image1: soal?.image1,
                image2: soal?.image2,
                image3: soal?.image3,
                image4: soal?.image4,
                image5: soal?.image5,
                option_image1: soal?.option_image1,
                option_image2: soal?.option_image2,
                option_image3: soal?.option_image3,
                option_image4: soal?.option_image4,
                option_image5: soal?.option_image5,
                option_point1: soal?.option_point1,
                option_point2: soal?.option_point2,
                option_point3: soal?.option_point3,
                option_point4: soal?.option_point4,
                option_point5: soal?.option_point5,
                option1: soal?.option1,
                option2: soal?.option2,
                option3: soal?.option3,
                option4: soal?.option4,
                option5: soal?.option5,
                explanation: soal?.explanation,
                created_at: soal?.created_at,
                created_by: soal?.created_by
            };
        })

        const response: ResultsResponse<WorksResultsResponse> = {

            ...data,
            works: worksResultsResponse as Array<WorksResultsResponse>
        }

        return toWorksResultsResponse(response)
    }
}