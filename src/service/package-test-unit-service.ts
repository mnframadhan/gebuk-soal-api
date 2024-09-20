import { Company } from "@prisma/client";
import { PackageTestUnitCreateRequest, PackageTestUnitsResponse } from "../model/package-test-unit-model";
import { Validation } from "../validation/Validation";
import { PackageTestUnitValidation } from "../validation/package-test-unit-validation";
import { prismaClient } from "../application/database";

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

        const validatedRequest = Validation.validate(PackageTestUnitValidation.CREATE, request);
        await prismaClient.packageTestUnit.update({
            where: {
                id: package_test_unit_id,
                company_id: company.id
            },
            data: {
                ...validatedRequest
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

        const response = await prismaClient.packageTestUnit.findMany({
            where : {
                package_bundle_id: package_bundle_id,
                company_id: company.id
            },
            orderBy : {
                created_at: 'desc'
            }
        })

        return {
            message: "Success",
            package_bundle_id: package_bundle_id,
            company_id: company.id,
            data: response
        };
    }
}