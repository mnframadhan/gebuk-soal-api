import { PackageBundle, Student } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CandidateCreateRequest, CandidateResponse, CandidateResultRequest, CandidateUpdateRequest } from "../model/candidate-model";
import { PackageBundleResponseDetails } from "../model/package-bundle-model";
import { packageTestUnitsPagination, PackageTestUnitsWorksRequest, PackageTestUnitWorksResponse } from "../model/package-test-unit-model";
import { Validation } from "../validation/Validation";
import { CandidateValidation } from "../validation/candidate-validation";
import { v4 as uuid } from "uuid"; 

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

    static async getPackageTestUnitByPackageBundleIdPagination(page: number, package_bundle: PackageBundle, student: Student) : Promise<packageTestUnitsPagination> {

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

    static async createWorks(request: PackageTestUnitsWorksRequest, package_bundle_id: string, package_test_unit_id: string, student: Student ) : Promise<PackageTestUnitWorksResponse> {

        const validatedRequest = Validation.validate(CandidateValidation.WORK, request);

        const end_time : string = String(Date.now());
        const response = await prismaClient.packageTestWorks.create({
			
            data: {
                ...validatedRequest,
                end_time: end_time,
                student_id: student.id,
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

        // find the last works
        const latestTestUnits = await prismaClient.packageTestWorks.groupBy({
            by: ["package_test_unit_id"],
            where: {
              package_bundle_id: package_bundle_id,
              student_id: student.id
            },
            _max: {
              end_time: true,
            }
          });
          

        if(!latestTestUnits) {
            throw new ResponseError(404, "Records not found");
        }

        const detailedRecords = await prismaClient.packageTestWorks.findMany({
            where: {
              OR: latestTestUnits.map(unit => ({
                package_test_unit_id: unit.package_test_unit_id,
                end_time: unit._max.end_time
              }))
            },
            select: {
              package_test_unit_id: true,
              end_time: true,
              selected_answer: true,
              package_bundle_id: true,
            }
          });

        const units = await prismaClient.packageTestUnit.findMany({

            where: {
                OR: latestTestUnits.map(unit => ({
                    id: unit.package_test_unit_id,
                }))
            },
            select: {
                id: true,
                unique_answer: true,
            }
        })

        type Res = Array<{
            package_test_unit: string;
            selected_answer: string;
            correct_answer: string;
            correct: boolean;
            end_time: string;
        }>

        // results
        const results : Res = units.map((u) => {

            const unitItem = detailedRecords.find(d => d.package_test_unit_id  === u.id );

            return {
                package_test_unit : u.id!,
                selected_answer: unitItem?.selected_answer!,
                correct_answer: u.unique_answer!,
                correct: unitItem ? unitItem.selected_answer === u.unique_answer : false,
                end_time: unitItem!.end_time!
            }
        })

        const candidate = await prismaClient.candidate.findFirst({

            where: {student_id: student.id},
            select: {
                id: true
            }
        })

        const duration = Number(validatedRequest.end_time) - Number(validatedRequest.start_time);

        const end_results = {
            id: String(uuid()),
            candidate_id: candidate!.id,
            total_records : results.length,
            duration: duration,
            n_true : results.filter((r) => r.correct ).length,
            n_false : results.length - results.filter((r) => r.correct ).length,
            points: results.filter((r) => r.correct ).length/results.length,
            package_bundle_id: package_bundle_id,
            start_time: String(validatedRequest.start_time),
            end_time: String(validatedRequest.end_time)
        };

        const response = await prismaClient.packageTestResults.create({
            data: end_results
        })

        return response;

    }

    static async getResultsForCandidate(student: Student ) {

        const candidate = await prismaClient.candidate.findFirst({where: {email: student.email}})
        

        if (!candidate) {
            throw new ResponseError(404, "Kandidat tidak ditemukan / belum dibuat");
        }
        
        const packageResults = await prismaClient.packageTestResults.findMany({

            where: {
                candidate_id: candidate.id
            }
        })

        const resultsPackageBundleID = packageResults.map((res) => res.package_bundle_id);

        const packageBundles = await prismaClient.packageBundle.findMany({
            where: {
                id: {
                    in: resultsPackageBundleID
                }
            },
        });

        const packageBundlesCompanyID = packageBundles.map((res) => res.company_id);

        const companies = await prismaClient.company.findMany({
            where: {
                id: {
                    in: packageBundlesCompanyID
                }
            }
        })

        const result = packageResults.map((r) => {

            const pakcageBundlesFind = packageBundles.find((pb) => pb.id === r.package_bundle_id);
            const companiesFind = companies.find((c) => c.id === pakcageBundlesFind?.company_id);

            return {
                id: r.id,
                package_name: pakcageBundlesFind ? pakcageBundlesFind.package_name : null,
                company: companiesFind ? companiesFind.brand_name : null,
                duration : r.duration,
                start_time: r.start_time,
                end_time: r.end_time
            }
        })

        return result;

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
