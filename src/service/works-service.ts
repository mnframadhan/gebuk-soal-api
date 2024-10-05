import { Student } from "@prisma/client";
import { v4 as uuid, v4 } from "uuid";
import { prismaClient } from "../application/database";
import { getSoalWithExcludedIds, getSoalWithExcludedIdsbyCat } from "../helpers/get-soal-works";
import { Paging } from "../model/pages";
import { ResultsResponse, toWorkResponse, toWorksResultsResponse, WorksRequest, WorksResultsResponse } from "../model/works-model";

export class WorksService {

    static async getRemainingLimit(student: Student): Promise<{ remaining_limit: number, membership: string }> {

        const response = { remaining_limit: student.quota, membership: student.membership }
        return response

    }

    static async getWorks(student: Student, category: string, page: number, remaining_limit: number) {

        const pagination: Paging = {
            size: 1,
            total_page: remaining_limit,
            current_page: page
        }

        if (category==="none") {
            const soals = await getSoalWithExcludedIds(student.username)
            return {pagination: pagination, data: [soals]}
        } else {
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

        const currentAnswer = currentSoal?.correct_answer as string

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
                soal_id: soal,
                created_at: created_at
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

        // const current_soal = await prismaClient.soal.findUnique({
        //     where: {
        //         id: soal
        //     }
        // })

        // updateStudentNSoal(student.id, current_soal?.category!);

        return toWorkResponse(works);
    }


    static async setTodayWorks(student: Student) {

        // get Todays Works
        const today = String(Date.now());
        const tomorrow = String(Date.now() + 86400)
        

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

        // insert into database
        const response = await prismaClient.result.create({
            data: data
        })

        return (response)
    }

    static async getTodayWorks(student: Student): Promise<ResultsResponse<WorksResultsResponse>> {

        // get Todays Works
        const today = String(Date.now());
        const tomorrow = String(Date.now() + 86400);

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