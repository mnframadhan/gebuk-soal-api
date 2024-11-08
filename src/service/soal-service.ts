import { Contributor } from "@prisma/client";
import { prismaClient } from "../application/database";
import { SoalRequest, SoalResponse, toSoalResponse } from "../model/soal-model";
import { SoalValidation } from "../validation/soal-validation";
import { Validation } from "../validation/Validation";
import { v4 as uuid } from "uuid";

export class SoalService {

    static async createSoal(request: SoalRequest, contributor: Contributor) : Promise<SoalResponse> {

        // validation
        const validatedRequest = Validation.validate(SoalValidation.CREATE, request);

        const id = String(uuid());
        const created_at = String(Date.now());

        // prepare insert data
        const data = {
            ...validatedRequest,
            created_by: contributor.username,
            id: id,
            created_at: created_at
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
	
	static async createManySoal(request: SoalRequest[], contributor: Contributor ) : Promise<{message: string}> {

		const completeData = request.map(item => ({
			id: uuid(),
			created_at: String(Date.now()),
			created_by: contributor.username,
			...item
		}))

		await prismaClient.soal.createMany({
			data: completeData
		})

        await prismaClient.contributor.update({
            where: {
                username: contributor.username
            },
            data: {
                n_soal: contributor.n_soal + completeData.length,
                contribution_points: contributor.contribution_points + 10*completeData.length
            }
        })
		return {message: "Success"}
	}
}
