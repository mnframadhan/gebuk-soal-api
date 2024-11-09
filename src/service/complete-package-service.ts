import { Contributor } from "@prisma/client";
import { CompletePackageRequest, CompletePackageResponse } from "../model/complete-package-model";
import { Validation } from "../validation/Validation";
import { CompletePackageValidation } from "../validation/soal-validation";
import { prismaClient } from "../application/database";
import { SoalRequest } from "../model/soal-model";
import { v4 as uuid } from "uuid";

export class CompletePackageServices {
    static async createCompletePackage(
        request: CompletePackageRequest,
        contributor: Contributor
    ): Promise<{ message: string }> {
        const validatedRequest = Validation.validate(CompletePackageValidation.CREATE, request);

        const createdAt = String(Date.now());
        const createdBy = String(contributor.username);

        const data = {
            ...validatedRequest,
            created_at: createdAt,
            created_by: createdBy,
        };

        await prismaClient.completePackage.create({
            data: data,
        });

        return {
            message: "Success",
        };
    }

	static async createManySoalComplete(request: SoalRequest[], contributor: Contributor ) : Promise<{message: string}> {

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

	static async getCompletePackage(contributor: Contributor) : Promise<CompletePackageResponse[]> {
		
		const completePackage = await prismaClient.completePackage.findMany({
			where: {
				created_by: contributor.username	
			}
		})
		
		return completePackage

	}
}
