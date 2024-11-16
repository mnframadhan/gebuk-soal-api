import { Contributor, Student } from "@prisma/client";
import { CompletePackageRequest, CompletePackageResponse } from "../model/complete-package-model";
import { Validation } from "../validation/Validation";
import { CompletePackageValidation } from "../validation/soal-validation";
import { prismaClient } from "../application/database";
import { SoalRequest } from "../model/soal-model";
import { v4 as uuid } from "uuid";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";

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

    static async createManySoalComplete(
        request: SoalRequest[],
        contributor: Contributor
    ): Promise<{ message: string }> {
        const completeData = request.map((item) => ({
            id: uuid(),
            created_at: String(Date.now()),
            created_by: contributor.username,
            ...item,
        }));

        await prismaClient.soal.createMany({
            data: completeData,
        });

        await prismaClient.contributor.update({
            where: {
                username: contributor.username,
            },
            data: {
                n_soal: contributor.n_soal + completeData.length,
                contribution_points: contributor.contribution_points + 10 * completeData.length,
            },
        });

        return { message: "Success" };
    }

    static async getCompletePackage(contributor: Contributor): Promise<CompletePackageResponse[]> {
        const completePackage = await prismaClient.completePackage.findMany({
            where: {
                created_by: contributor.username,
            },
        });

        return completePackage;
    }

    static async getAllCompletePackages(): Promise<CompletePackageResponse[]> {
        const completePackages = await prismaClient.completePackage.findMany();
        return completePackages;
    }

    static async getCompletePackageById(complete_package_id: string): Promise<CompletePackageResponse> {
        const completePackage = await prismaClient.completePackage.findFirst({
            where: {
                id: complete_package_id,
            },
        });

        if (!completePackage) {
            throw new ResponseError(404, "Paket Tidak Ditemukan");
        }

        return completePackage;
    }

	static async orderCompletePackage(request: {password: string}, complete_package_id: string, student: Student) : Promise<{message: string}> {

		const isMatched = await bcrypt.compare(request.password, student.password);
		if (!isMatched) {
			throw new ResponseError(401, "Password Salah")
		}
		
		const alreadyExist = await prismaClient.studentCompletePackage.findFirst({
			where: {
				student_id: student.id,
				complete_package_id: complete_package_id
			}
		})

		if (alreadyExist) {
			throw new ResponseError(400, "Paket telah dibeli")
		}

		const createdAt = String(Date.now());
		const data = {
			student_id: student.id,
			complete_package_id : complete_package_id,
			created_at: createdAt
		}

		await prismaClient.studentCompletePackage.create({
			data: data 		
		})

		return {
			message: "Success"
		}
	}

	static async getCompletePackageOwned(student: Student) : Promise<any> {

		const completePackage = await prismaClient.completePackage.findMany({
			select: {
				package_name: true,
				StudentCompletePackage: {
					where: {
						student_id: student.id
					}
				}
			}
		})
		return completePackage
	}

}
