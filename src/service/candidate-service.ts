import { PackageBundle, Student } from "@prisma/client";
import { CandidateCreateRequest, CandidateResponse, CandidateUpdateRequest } from "../model/candidate-model";
import { Validation } from "../validation/Validation";
import { CandidateValidation } from "../validation/candidate-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { PackageBundleResponseDetails } from "../model/package-bundle-model";

export class CandidateService {

    static async createCandidate(request: CandidateCreateRequest, student: Student) : Promise<CandidateResponse> {

        const validatedRequest = Validation.validate(CandidateValidation.CREATE, request);
        const created_at = String(Date.now())
        const response = await prismaClient.candidate.create({
        
            data: {
                ...validatedRequest,
                email: student.email,
                student_id: student.id,
                created_at: created_at
            }
        })
        return response;
    }

    static async getCurrentCandidates(student: Student) : Promise<CandidateResponse | {message: string}> {

        const candidate = await prismaClient.candidate.findFirst({
            where: {
                student_id: student.id
            }
        })

        if(!candidate) {
            throw new ResponseError(404, "Kamu belum memiliki kandidat kandidat");
        }
        return candidate;
    }

    static async checkPackageBundleToken(package_bundle_token: string) : Promise<{message: string, token: string | null}> {

        const package_bundle = await prismaClient.packageBundle.findFirst({
            where: {
                token: package_bundle_token
            }
        })

        let response : {message: string, token: string | null};
        if(!package_bundle) {
            response = {message: "Token Tidak Valid", token: null}
            return response;
        } else {
            response = {message: "Token Valid", token: package_bundle.token}
            return response;
        }
    }

    static async getPackageBundleById(package_bundle: PackageBundle, student: Student) : Promise<PackageBundleResponseDetails> {

        const company = await prismaClient.company.findFirst({
            where: {
                id: package_bundle.company_id
            },
            select: {
                brand_name: true,
                legal_name: true
            }
        })

        if(!company) {
            throw new ResponseError(404, "Tidak Ditemukan")
        }

        const response = {
            package_name: package_bundle.package_name!,
            company_brand_name: company.brand_name,
            company_legal_name: company.legal_name,
            present_n_unit: package_bundle.present_n_unit!,
            max_duration: package_bundle.max_duration!,
            token: package_bundle.token!,
            authorized_student: student.username!
        }

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