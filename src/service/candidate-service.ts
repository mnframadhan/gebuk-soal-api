import { Student } from "@prisma/client";
import { CandidateCreateRequest, CandidateResponse, CandidateUpdateRequest } from "../model/candidate-model";
import { Validation } from "../validation/Validation";
import { CandidateValidation } from "../validation/candidate-validation";
import { prismaClient } from "../application/database";

export class CandidateService {

    static async createCandidate(request: CandidateCreateRequest, student: Student) : Promise<CandidateResponse> {

        const validatedRequest = Validation.validate(CandidateValidation.CREATE, request);
        const created_at = String(Date.now())
        const response = await prismaClient.candidate.create({
        
            data: {
                ...validatedRequest,
                student_id: student.id,
                created_at: created_at
            }
        })
        return response;
    }

    static async updateCandidate(request: CandidateUpdateRequest, student: Student) : Promise<{message: string}> {

        const validatedRequest = Validation.validate(CandidateValidation.UPDATE, request);

        await prismaClient.candidate.update({

            where: {
                student_id: student.id
            },
            data: validatedRequest

        })

        return {
            message: "Success"
        }
    }
}