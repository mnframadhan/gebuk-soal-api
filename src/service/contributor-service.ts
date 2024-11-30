import {
	ContributorLoginRequest,
	ContributorRequest,
	ContributorResponse,
	minimizedSoalCreatedResponse,
	toContributorResponse,
	toMinimizedSoalCreatedResponse,
} from "../model/contributor-model";
import { prismaClient } from "../application/database";
import { Validation } from "../validation/Validation";
import { ContributorValidation } from "../validation/contributor-validation";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { Contributor } from "@prisma/client";
import { Pageable, Paging } from "../model/pages";
import { ResponseError } from "../error/response-error";

export class ContributorServices {
	static async createContributor(request: ContributorRequest) {
		// validation
		const validatedRequest = Validation.validate(ContributorValidation.CREATE, request);

		if (!validatedRequest) {
			throw new Error("Invalid request");
		}

		// check if email already exists
		const numberOfEmail: number = await prismaClient.contributor.count({
			where: {
				email: validatedRequest.email,
			},
		});

		if (numberOfEmail != 0) {
			throw new Error("Email already exists");
		}

		// hash password
		const hashedPassword = await bcrypt.hash(validatedRequest.password, 10);

		// set hashedPassword into validatedPassword
		validatedRequest.password = hashedPassword;

		// create uuid and datetime now
		const contributorUUID: string = String(uuid());
		const created_at: string = String(Date.now());

		// prepare data for database
		const data = {
			...validatedRequest,
			id: contributorUUID,
			created_at: created_at,
		};

		// create contributor
		const response: ContributorResponse = await prismaClient.contributor.create({
			data: data,
		});

		// return response
		return response;
	}

	static async loginContributor(request: ContributorLoginRequest): Promise<ContributorResponse> {
		// validation
		const validatedRequest = Validation.validate(ContributorValidation.LOGIN, request);

		let contributor = await prismaClient.contributor.findFirst({
			where: {
				username: validatedRequest.username,
			},
		});

		if (!contributor) {
			throw new Error("Username or password is incorrect");
		}

		// check if ppassword is valid
		const passwordMatch = await bcrypt.compare(validatedRequest.password, contributor.password);

		if (!passwordMatch) {
			throw new Error("Username or password is incorrect");
		}

		// set token
		const token = String(uuid());
		contributor = await prismaClient.contributor.update({
			where: {
				username: validatedRequest.username,
			},
			data: {
				token: token,
			},
		});

		// define response
		const response = toContributorResponse(contributor);

		return response;
	}

	static async getCurrentContributor(contributor: Contributor): Promise<ContributorResponse> {
		return toContributorResponse(contributor);
	}

	static async getSoalCreated(
		page: number,
		limit: number,
		contributor: Contributor
	): Promise<Pageable<minimizedSoalCreatedResponse>> {
		const skip = (page - 1) * limit;
		const pagination: Paging = {
			size: limit,
			total_page: Math.ceil(
				Number(await prismaClient.soal.count({ where: { created_by: contributor.username } })) / limit
			),
			current_page: page,
		};

		const soal = await prismaClient.soal.findMany({
			where: {
				created_by: contributor.username,
			},
			orderBy: {
				created_at: "desc",
			},
			skip: skip,
			take: limit,
		});

		if (!soal) {
			throw new ResponseError(404, "Not Found");
		}

		const data = soal.map(({ created_at, id, text }) => ({ created_at, id, text }));

		return toMinimizedSoalCreatedResponse(data, pagination);
	}

	static async logoutCurrentContributor(contributor: Contributor): Promise<void> {
		await prismaClient.contributor.update({
			where: {
				username: contributor.username,
			},
			data: {
				token: null,
			},
		});
	}
}
