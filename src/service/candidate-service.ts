import { PackageBundle, Student } from "@prisma/client";
import bcrypt from "bcrypt";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CandidateCreateRequest, CandidateResponse, CandidateResultRequest, CandidateUpdateRequest } from "../model/candidate-model";
import { packageTestUnitsPagination, PackageTestUnitsWorksRequest} from "../model/package-test-unit-model";
import { Validation } from "../validation/Validation";
import { CandidateValidation } from "../validation/candidate-validation";
import { v4 as uuid } from "uuid"; 
import nodemailer, { SentMessageInfo } from "nodemailer"
import { get4RandomDigits } from "../helpers/get-4-random-digit";

export class CandidateService {

    static async createCandidate(request: CandidateCreateRequest, student: Student) : Promise<CandidateResponse> {

        const validatedRequest = Validation.validate(CandidateValidation.CREATE, request);
        const created_at = String(Date.now())
		
		const isUsedIdNumber = await prismaClient.candidate.count({
			where: { id_number: validatedRequest.id_number }
		})

		if (isUsedIdNumber != 0) {
			throw new ResponseError(400, "NIK telah digunakan");
		}
	
		const auth_digits = get4RandomDigits();
		const hashed_auth_digits = await bcrypt.hash(auth_digits, 8)

        const response = await prismaClient.candidate.create({
        
            data: {
                ...validatedRequest,
                email: student.email,
                student_id: student.id,
                created_at: created_at,
				verification_code: hashed_auth_digits,
            }
        })

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
            subject: `[Verifikasi Akun] ${validatedRequest.full_name}, Akun Kandidat Telah Dibuat, Segera Verifikasi`,
            text: `Kode Autentikasi 4-digit angka: ${auth_digits}`,
        };

        transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
            if (error) {
				console.log(`Error: ${info}`)
                throw new ResponseError(422, "Invalid Email");
            }
        });

        return response;
    }

	static async candidateEmailVerification( request: {verification_code: string}, student: Student) : Promise<{message: string}> {

		const candidate = await prismaClient.candidate.findUnique({
			where: {
				student_id: student.id
			},
			select: {
				verification_code: true
			}
		})

		if(!candidate) {
			throw new ResponseError(404, "Kandidat Tidak Ditemukan")
		}

        const verificationCode = await bcrypt.compare(request.verification_code, candidate.verification_code!);

        if (!verificationCode) {
            throw new ResponseError(422, "Verifikasi Gagal");
        }

        await prismaClient.student.update({
            where: { id: student.id },
            data: { verified: true },
        });

		return { message: "Success"}

	}

	
    static async getCurrentCandidates(student: Student) : Promise<any> {
		
		const candidate = await prismaClient.student.findUnique({
			where: {id: student.id},
			select: {
				id: true,
				candidate: {
					select: {
						full_name: true,
						email: true,
						address: true,
						phone: true,
						packageTestResults: {
							select: {
								packageBundle: {
									select: {
										id: true,
										package_name: true,
										company: {
											select: {
												brand_name: true
											}
										}
									}
								},
								start_time: true,
								end_time: true,
								duration: true,
							},
						},
					}
				},
			}
		})

        if(!candidate!.candidate) {
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

    static async getPackageBundleById(package_bundle: PackageBundle, student: Student) : Promise<any> {

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
            brand_name: company.brand_name,
            legal_name: company.legal_name,
            present_n_unit: package_bundle.present_n_unit!,
            max_duration: package_bundle.max_duration!,
            token: package_bundle.token!,
            authorized_student: student.username!
        }

        return response;
    }

    static async getPackageTestUnitByPackageBundleIdPagination(page: number, package_bundle: PackageBundle) : Promise<packageTestUnitsPagination> {

        const pageNum : number = page;
        const size : number = 1;

        const testUnits = await prismaClient.packageTestUnit.findMany({
            where: {
                package_bundle_id: package_bundle.id,
                company_id: package_bundle.company_id
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
                package_bundle_id: package_bundle.id,
                company_id: package_bundle.company_id
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

    static async createWorks(request: PackageTestUnitsWorksRequest, package_bundle_id: string, package_test_unit_id: string, student: Student ) : Promise<{id: string, selected_answer: string, end_time: string | null}> {

        const validatedRequest = Validation.validate(CandidateValidation.WORK, request);

		const current_candidate = await prismaClient.candidate.findUnique({
			where: {
				student_id: student.id
			}
		})

		if(!current_candidate) {
			throw new ResponseError(404, "Tidak ditemukan")
		}

        const end_time : string = String(Date.now());
        const response = await prismaClient.packageTestWorks.create({
			
            data: {
                ...validatedRequest,
                end_time: end_time,
                candidate_id: current_candidate.id,
                package_test_unit_id: package_test_unit_id,
                package_bundle_id: package_bundle_id
            },
            select: {
                id: true,
                selected_answer: true,
                end_time: true,
            }
        })

        return response;

    }

    static async createResult(request: CandidateResultRequest, student: Student, package_bundle_id: string ) : Promise<any> {

        const validatedRequest = Validation.validate(CandidateValidation.DONE, request);
		
		// kandidat
		const currentCandidate = await prismaClient.candidate.findUnique({
			where: {
				student_id: student.id
			},
		})

		if(!currentCandidate) {
			throw new ResponseError(404, "Tidak Ditemukan")
		}

		const latestWorks = await prismaClient.packageTestWorks.groupBy({
			where: {
				candidate_id: currentCandidate.id,
				package_bundle_id: package_bundle_id
			},
			by: ['id'],
			_max: {
				end_time: true
			},
		})

		const works = await prismaClient.packageTestWorks.findMany({
			where: {
				candidate_id: currentCandidate.id,
				package_bundle_id: package_bundle_id,
				id: {
					in: latestWorks.map(i => i.id)
				}
			},
			select: {
				package_test_unit_id: true,
				selected_answer : true,
				end_time : true,
			}
		})

		const testUnit = await prismaClient.packageTestUnit.findMany({
			where: {
				package_bundle_id: package_bundle_id,
				id: {
					in: works.map(i => i.package_test_unit_id)
				},
			},
			select: {
				id: true,
				packageBundle: {
					select: {
						package_name: true,
						company: {
							select: {
								brand_name: true
							}
						}
					}
				},
				unique_answer: true
			}
		})

		const truth = testUnit.map(t => {
			const findWorks = works.find(w => w.selected_answer === t.unique_answer);
			return findWorks ? t.unique_answer === findWorks.selected_answer : false;
		})

		const n_records = truth.length;
		const n_true = truth.filter(t => t === true).length;
		const n_false = n_records - n_true;
		const points = n_true/n_records;

		const duration = Number(validatedRequest.end_time) - Number(validatedRequest.start_time);
        const end_results = {
            id: String(uuid()),
            candidate_id: currentCandidate!.id,
            total_records : n_records,
            duration: duration,
            n_true : n_true, 
            n_false : n_false, 
            points: points, 
            package_bundle_id: package_bundle_id,
            start_time: String(validatedRequest.start_time),
            end_time: String(validatedRequest.end_time)
        };

        const response = await prismaClient.packageTestResults.create({
            data: end_results
        })

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.COMPANY_EMAIL!,
                pass: process.env.EMAIL_PASSWORD!,
            },
        });

        const mailOptions = {
            from: process.env.COMPANY_EMAIL!,
            to: currentCandidate.email,
            subject: `Berhasil Menyelesaikan Test`,
            text: `Anda Telah Menyelesaikan Test ${testUnit[0].packageBundle.package_name} untuk ${testUnit[0].packageBundle.company.brand_name}`,
        };

        transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
            if (error) {
				console.log(`Error: ${info}`)
                throw new ResponseError(422, "Invalid Email");
            }
        });
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
