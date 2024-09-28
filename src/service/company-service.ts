import { Company } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CompanyLoginRequest, CompanyRegisterRequest, CompanyResponse } from "../model/company-model";
import { CompanyValidation } from "../validation/company-validation";
import { Validation } from "../validation/Validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class CompanyService {

    static async createCompany(request: CompanyRegisterRequest) : Promise<CompanyResponse> {

        const validatedRequest = Validation.validate(CompanyValidation.REGISTER, request);

        const countEmail = await prismaClient.company.count({
            where: {
                email: validatedRequest.email
            }
        })

        if (countEmail != 0) {
            throw new ResponseError(400, "Email already in use, do you mean log in?");
        }

        validatedRequest.password = await bcrypt.hash(validatedRequest.password, 8);

        const created_at: string = String(Date.now());

        const data = {
            ...validatedRequest,
            created_at: created_at
        }

        const response = await prismaClient.company.create({
            data: data,
            select: {
                id: true,
                brand_name: true,
                legal_name: true,
                email: true,
                phone: true,
                address: true,
                password: false,
                sector: true,
                sub_sector: true,
                n_employee: true,
                n_package: true,
                n_applicant: true,
                token: true,
                created_at: true,
            }
        })

        console.log(response);

        return response;

    }

    static async loginCompany(request: CompanyLoginRequest) : Promise<CompanyResponse> {

        const validatedRequest = Validation.validate(CompanyValidation.LOGIN, request);

        const company = await prismaClient.company.findFirst({
            where: {
                email: validatedRequest.email
            }
        })

        if (!company) {
            throw new ResponseError(400, "Username or Password is incorrect");
        }

        const comparedPassword = await bcrypt.compare(validatedRequest.password, company.password);

        if (!comparedPassword) {
            throw new ResponseError(400, "Username or Password is incorrect");
        }

        const response = await prismaClient.company.update({
            where: {
                email: validatedRequest.email
            },
            data: {
                token: uuid()
            },
            select: {
                id: true,
                brand_name: true,
                legal_name: true,
                email: true,
                phone: true,
                address: true,
                password: false,
                sector: true,
                sub_sector: true,
                n_employee: true,
                n_package: true,
                n_applicant: true,
                token: true,
                created_at: true,
            }
        })

        return response;

    }

    static async logoutCompany(company: Company) : Promise<{message: string}> {

        await prismaClient.company.update({

            where: {
                email: company.email
            },
            data: {token: null}
        })

        return {message: "OK"}

    }

    static async getCurrentCompany(company: Company) : Promise<CompanyResponse> {

        return {
            id: company.id,
            brand_name: company.brand_name,
            legal_name: company.legal_name,
            email: company.email,
            phone: company.phone,
            address: company.address,
            sector: company.sector,
            sub_sector: company.sub_sector,
            n_employee: company.n_employee,
            n_package: company.n_package,
            n_applicant: company.n_applicant,
            created_at: company.created_at,
            banner_image: company.banner_image,
        }

    }
    
    static async updateProfileBanner(request: {imageUrl: string}, company: Company) : Promise<{message: string}> {

        // logic here
        await prismaClient.company.update({
            where: {id: company.id},
            data: {banner_image: request.imageUrl}
        })

        return {
            message: "Profile banner updated successfully"
        }

    }

    static async updateStatus(company: Company) : Promise<{message: string}> {

        const requestUpdatedAt = String(Date.now());

        await prismaClient.company.update({
            where: {
                id: company.id
            },
            data: {
                status: "Waiting",
                request_updated_at: requestUpdatedAt
            }
        })

        return {message: "Success"}
    }
	
	static async orderStandardPackage(company: Company) : Promise<{message: string}> {

			await prismaClient.company.update({

					where: {id : company.id},
					data: {
							status: "Standard"
					}
			})
			
			return {message: "Success"}
	}
}
