import { Company } from "@prisma/client";
import { prismaClient } from "../application/database";
import { PackageTestUnitCreateRequest, PackageTestUnitsResponse } from "../model/package-test-unit-model";
import { Validation } from "../validation/Validation";
import { PackageTestUnitValidation } from "../validation/package-test-unit-validation";

export class PackageTestUnitService {
    

    static async createPackageTestUnit (package_bundle_id: string, request: PackageTestUnitCreateRequest, company: Company) : Promise<PackageTestUnitCreateRequest> {

        const validatedRequest = Validation.validate(PackageTestUnitValidation.CREATE, request);
        const created_at = String(Date.now());
        const response = await prismaClient.packageTestUnit.create({
            data: {
                ...validatedRequest, 
                created_at: created_at,
                company_id: company.id,
                package_bundle_id: package_bundle_id,
            }
        })
        
        await prismaClient.packageBundle.update({
            where: {
                id:package_bundle_id,
                company_id: company.id
            },
            data: {
                present_n_unit: {increment: 1}
            }
        })

        return response;
    }

    static async updatePackageTestUnit (package_test_unit_id: string, request: PackageTestUnitCreateRequest, company: Company) : Promise<{message: string}> {

        const validatedRequest = Validation.validate(PackageTestUnitValidation.UPDATE, request);
        await prismaClient.packageTestUnit.update({
            where: {
                id: package_test_unit_id,
                company_id: company.id
            },
            data: {
                ...(validatedRequest.text !== undefined && {text: validatedRequest.text}),
                ...(validatedRequest.question !== undefined && {question: validatedRequest.question}),
                ...(validatedRequest.option1 !== undefined && {option1: validatedRequest.option1}),
                ...(validatedRequest.option1_point !== undefined && {option1_point: validatedRequest.option1_point}),
                ...(validatedRequest.option1_image !== undefined && {option1_image: validatedRequest.option1_image}),
                ...(validatedRequest.option2  !== undefined && {option2: validatedRequest.option2}),
                ...(validatedRequest.option2_point !== undefined && {option2_point: validatedRequest.option2_point}),
                ...(validatedRequest.option2_image !== undefined && {option2_image: validatedRequest.option2_image}),
                ...(validatedRequest.option3 !== undefined && {option3: validatedRequest.option3}),
                ...(validatedRequest.option3_point !== undefined && {option3_point: validatedRequest.option3_point}),
                ...(validatedRequest.option3_image !== undefined && {option3_image: validatedRequest.option3_image}),
                ...(validatedRequest.option4 !== undefined && {option4: validatedRequest.option4}),
                ...(validatedRequest.option4_point !== undefined && {option4_point: validatedRequest.option4_point}),
                ...(validatedRequest.option4_image !== undefined && {option4_image: validatedRequest.option4_image}),
                ...(validatedRequest.option5 !== undefined && {option5: validatedRequest.option5}),
                ...(validatedRequest.option5_point !== undefined && {option5_point: validatedRequest.option5_point}),
                ...(validatedRequest.option5_image !== undefined && {option5_image: validatedRequest.option5_image}),
                ...(validatedRequest.unique_answer !== undefined && {unique_answer: validatedRequest.unique_answer})
            }
        })
        return {message: "Updated"};
    }

    static async deletePackageTestUnit(package_bundle_id: string, package_test_unit_id: string, company: Company) : Promise<{message: string}> {

        await prismaClient.packageTestUnit.delete({
            where: {
                id: package_test_unit_id,
                company_id: company.id
            }
        })

        await prismaClient.packageBundle.update({
            where: {
                id: package_bundle_id,
                company_id: company.id
            },
            data: {
                present_n_unit: {decrement: 1}
            }
        })


        return {message: "Deleted"};
    }

    static async getPackageTestUnitByPackageBundleId(package_bundle_id: string, company: Company) : Promise<PackageTestUnitsResponse> {

        const units  = await prismaClient.packageTestUnit.findMany({
            where : {
                package_bundle_id: package_bundle_id,
                company_id: company.id
            },
            orderBy: {
                created_at: 'asc'
            }
        })

        const response = {
            message: "Success",
            package_bundle_id: package_bundle_id,
            data: units
        }

        return response;
    }
}
