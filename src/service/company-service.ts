import { Company, PackageBundle } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CompanyLoginRequest, CompanyRegisterRequest, CompanyResponse } from "../model/company-model";
import { CompanyValidation } from "../validation/company-validation";
import { Validation } from "../validation/Validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { packageTestUnitsPagination } from "../model/package-test-unit-model";

export class CompanyService {

	static async sayHelloFromCompany() : Promise<{message: string}> {
		
		const message = "Hello, From Company";

		return {message: message};		
	}

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
				requested_to_update_at: requestUpdatedAt
			}
		})

		return {message: "Success"}
	}

	static async getPackageTestUnitByPackageBundleIdPagination(page: number, package_bundle_id: string, company: Company) : Promise<packageTestUnitsPagination> {

		const pageNum : number = page;
		const size : number = 1;

		const testUnits = await prismaClient.packageTestUnit.findMany({
			where: {
				package_bundle_id: package_bundle_id,
				company_id: company.id
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
				option5: true
			},
			skip: (pageNum - 1) * size,
			take: size
		})

		const totalPages = await prismaClient.packageTestUnit.count({
			where: {
				package_bundle_id: package_bundle_id,
				company_id: company.id
			}
		})

		const response = {

			pagination: {
				current_page: pageNum,
				total_page: totalPages,
				size: size
			},
			data: testUnits
		}

		return response;

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
