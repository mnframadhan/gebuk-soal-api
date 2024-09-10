import { Contributor } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ShowedSoalResponse, SoalRequest, SoalResponse, toSoalResponse, toSoalResponsePagination } from "../model/soal-model";
import { SoalValidation } from "../validation/soal-validation";
import { Validation } from "../validation/Validation";
import { v4 as uuid } from "uuid";
import { Pageable, Paging } from "../model/pages";
import { getRandomInt } from "../helpers/get-random-integer";
import { ResponseError } from "../error/response-error";

export class SoalService {

    static async createSoal(request: SoalRequest, contributor: Contributor) : Promise<SoalResponse> {

        // validation
        const validatedRequest = Validation.validate(SoalValidation.CREATE, request);

        const id = String(uuid());

        // prepare insert data
        const data = {
            ...validatedRequest,
            created_by: contributor.username,
            id: id
        }

        // insert into database
        const soal = await prismaClient.soal.create({
            data: data 
        });

        // update number of soal and contribution points
        await prismaClient.contributor.update({
            where: {
                username: contributor.username
            },
            data: {
                n_soal: contributor.n_soal + 1,
                contribution_points: contributor.contribution_points + 10
            }
        })

        return toSoalResponse(soal)
    }

    static async getSoal(limit: number) : Promise<Pageable<ShowedSoalResponse>> {

        const random_page = getRandomInt(Number(await prismaClient.soal.count()) / limit)
        const skip = (random_page - 1)*limit;
        
        const pagination: Paging = {

            size: limit,
            total_page: Math.ceil(Number(await prismaClient.soal.count()) / limit),
            current_page: random_page

        }


        const soal = await prismaClient.soal.findMany({
            orderBy: {
                created_at: "desc"
            },
            skip: skip,
            take: limit
        })

        if (!soal) {
            throw new ResponseError(404, 'Not Found')
        }

        return toSoalResponsePagination(soal, pagination)

    }
}