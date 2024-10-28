import { Company } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CompanyLoginRequest, CompanyRegisterRequest, CompanyResponse } from "../model/company-model";
import { CompanyValidation } from "../validation/company-validation";
import { Validation } from "../validation/Validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { packageTestUnitsPagination } from "../model/package-test-unit-model";
import { get4RandomDigits } from "../helpers/get-4-random-digit";
import nodemailer, { SentMessageInfo } from "nodemailer";

export class CompanyService {
    static async createCompany(request: CompanyRegisterRequest): Promise<CompanyResponse> {
        const validatedRequest = Validation.validate(CompanyValidation.REGISTER, request);

        const countEmail = await prismaClient.company.count({
            where: {
                email: validatedRequest.email,
            },
        });

        if (countEmail != 0) {
            throw new ResponseError(400, "Email already in use, do you mean log in?");
        }

        validatedRequest.password = await bcrypt.hash(validatedRequest.password, 8);

        const created_at: string = String(Date.now());
        const auth_digits = get4RandomDigits();
        const hashedAuthDigits = await bcrypt.hash(auth_digits, 8);

        const data = {
            ...validatedRequest,
            created_at: created_at,
            verification_code: hashedAuthDigits,
        };

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.COMPANY_EMAIL!,
                pass: process.env.EMAIL_PASSWORD!,
            },
        });

        const mailOptions = {
            from: process.env.COMPANY_EMAIL!,
            to: validatedRequest.email,
            subject: `[Verifikasi Akun] Terimakasih ${validatedRequest.brand_name}, Kamu Telah Melakukan Registrasi Akun Cipta Talenta`,
            text: `Kode Autentikasi 5-digit angka: ${auth_digits}`,
        };

        transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
            if (error) {
                throw new ResponseError(422, `Error: ${info}`);
            }
        });

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
                verified: true,
            },
        });

        return response;
    }

    static async companyEmailVerification(
        request: { verificationCode: string },
        company: Company
    ): Promise<{ message: string }> {
        const correctVerificationCode = await bcrypt.compare(request.verificationCode, company.verification_code!);

        if (!correctVerificationCode) {
            throw new ResponseError(422, "Tidak Valid");
        }

        await prismaClient.company.update({
            where: { id: company.id },
            data: { verified: true },
        });

        return { message: "Selamat! Akun berhasil di-verifikasi" };
    }

    static async loginCompany(request: CompanyLoginRequest): Promise<{ message: string; token: string }> {
        const validatedRequest = Validation.validate(CompanyValidation.LOGIN, request);

        const company = await prismaClient.company.findFirst({
            where: {
                email: validatedRequest.email,
            },
        });

        if (!company) {
            throw new ResponseError(400, "Username or Password is incorrect");
        }

        const comparedPassword = await bcrypt.compare(validatedRequest.password, company.password);
        const token: string = uuid() as string;

        if (!comparedPassword) {
            throw new ResponseError(400, "Username or Password is incorrect");
        }

        await prismaClient.company.update({
            where: {
                email: validatedRequest.email,
            },
            data: {
                token: token,
            },
        });

        return { message: "OK", token: token };
    }

    static async logoutCompany(company: Company): Promise<{ message: string }> {
        await prismaClient.company.update({
            where: {
                email: company.email,
            },
            data: { token: null },
        });

        return { message: "OK" };
    }

    static async getCurrentCompany(company: Company): Promise<CompanyResponse> {
        const companies = await prismaClient.company.findUnique({
            where: { id: company.id },
            select: {
                id: true,
                brand_name: true,
                legal_name: true,
                email: true,
                phone: true,
                address: true,
                sector: true,
                sub_sector: true,
                n_employee: true,
                n_package: true,
                n_applicant: true,
                created_at: true,
                token: true,
                banner_image: true,
                verified: true,
                general_preferred_skills: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                PackageBundle: {
                    select: {
                        package_name: true,
                        n_unit: true,
                        max_duration: true,
                        token: true,
                        id: true,
                        created_at: true,
                        expired_date: true,
                        present_n_unit: true,
                    },
                    orderBy: {
                        created_at: "desc",
                    },
                },
            },
        });

        if (!companies) {
            throw new ResponseError(404, "Not Found");
        }

        return companies;
    }

    static async setPreferredSkills(request: { name: string }, company: Company): Promise<{ message: string }> {
        // check if preferred skills already exist
        const preferredSkill = await prismaClient.preferredSkills.findFirst({
            where: {
                name: request.name,
                company_id: company.id,
            },
        });

        if (preferredSkill) {
            throw new ResponseError(400, "Already Exist");
        }

        await prismaClient.preferredSkills.create({
            data: {
                name: request.name,
                company_id: company.id,
            },
        });

        return { message: "OK" };
    }

    static async deletePreferredSkills(request: { id: number; company_id: string }): Promise<{ message: string }> {
        await prismaClient.preferredSkills.delete({
            where: {
                id: request.id,
                company_id: request.company_id,
            },
        });

        return { message: "Success" };
    }

    static async getAllCompanies() {
        const companiesWithPackageBundles = await prismaClient.company.findMany({
            select: {
                brand_name: true,
                legal_name: true,
                logo: true,
                general_preferred_skills: {
                    select: {
                        name: true,
                    },
                    take: 3,
                    orderBy: {
                        name: "asc",
                    },
                },
                PackageBundle: {
                    select: {
                        package_name: true,
                    },
                },
            },
            orderBy: {
                n_package: "desc",
            },
        });

        return companiesWithPackageBundles;
    }

    static async updateProfileBanner(request: { imageUrl: string }, company: Company): Promise<{ message: string }> {
        // logic here
        await prismaClient.company.update({
            where: { id: company.id },
            data: { banner_image: request.imageUrl },
        });

        return {
            message: "Profile banner updated successfully",
        };
    }

    static async updateStatus(company: Company): Promise<{ message: string }> {
        const requestUpdatedAt = String(Date.now());

        await prismaClient.company.update({
            where: {
                id: company.id,
            },
            data: {
                status: "Waiting",
                requested_to_update_at: requestUpdatedAt,
            },
        });

        return { message: "Success" };
    }

    static async getPackageTestUnitByPackageBundleIdPagination(
        page: number,
        package_bundle_id: string,
        company: Company
    ): Promise<packageTestUnitsPagination> {
        const pageNum: number = page;
        const size: number = 1;

        const testUnits = await prismaClient.packageTestUnit.findMany({
            where: {
                package_bundle_id: package_bundle_id,
                company_id: company.id,
            },
            select: {
                id: true,
                package_bundle_id: true,
                text: true,
                question: true,
                option1: true,
                option2: true,
                option3: true,
                option4: true,
                option5: true,
            },
            skip: (pageNum - 1) * size,
            take: size,
        });

        const totalPages = await prismaClient.packageTestUnit.count({
            where: {
                package_bundle_id: package_bundle_id,
                company_id: company.id,
            },
        });

        const response = {
            pagination: {
                current_page: pageNum,
                total_page: totalPages,
                size: size,
            },
            data: testUnits,
        };

        return response;
    }

    static async getPackageBundleResults(company: Company, package_bundle_id: string): Promise<any> {
        const result = await prismaClient.company.findMany({
            where: {
                id: company.id,
            },
            select: {
                PackageBundle: {
                    where: {
                        id: package_bundle_id,
                    },
                    select: {
                        package_name: true,
                        n_unit: true,
                        max_duration: true,
                        packageTestResult: {
                            where: {
                                package_bundle_id: package_bundle_id,
                            },
                            select: {
                                Candidate: {
                                    select: {
                                        full_name: true,
                                        email: true,
                                        city: true,
                                        district: true,
                                    },
                                },
                                points: true,
                                start_time: true,
                                end_time: true,
                                duration: true,
                            },
                        },
                    },
                },
            },
        });

        const response = result[0].PackageBundle.map((item) => item.packageTestResult)[0];
        return response;
    }

    static async orderStandardPackage(company: Company): Promise<{ message: string }> {
        await prismaClient.company.update({
            where: { id: company.id },
            data: {
                status: "Standard",
            },
        });

        return { message: "Success" };
    }


	static async touchCandidate(candidate_id: string, request: {message: string}, company: Company) : Promise<{message: string}> {

		const data = {
			candidate_id: candidate_id,
			company_id: company.id,
			message: request.message,
			created_at: String(Date.now())
		}
	
		await prismaClient.touch.create({
			data: data
		})
		
		return {message: "Berhasil Melakukan Touch"}	

	}

} 
