import { Company } from "@prisma/client";
import { PackageBundleCreateRequest, PackageBundleResponse, PackageBundlesResponse } from "../model/package-bundle-model";
import { Validation } from "../validation/Validation";
import { PackageBundleValidation } from "../validation/package-bundle-validation";
import { prismaClient } from "../application/database";

export class PackageBundleService {

    static async createPackageBundle (request: PackageBundleCreateRequest, company: Company) : Promise<PackageBundleResponse> {

        // validation
        const validatedRequest = Validation.validate(PackageBundleValidation.CREATE, request);

        // insert into database
        const created_at = String(Date.now());

        const response = await prismaClient.packageBundle.create({

            data: {...validatedRequest, company_id: company.id, created_at: created_at}
        })
        return response;
    }

    static async updatePackageBundle (id: string, request: PackageBundleCreateRequest, company: Company) : Promise<PackageBundleResponse> {

        // validation
        const validatedRequest = Validation.validate(PackageBundleValidation.UPDATE, request);

        // update in database
        const response = await prismaClient.packageBundle.update({

            where : {
                id: id,
                company_id: company.id
            },
            data : validatedRequest
        })

        return response;
    }

    static async deletePackageBundle (id: string, company: Company): Promise<{message: string}> {

        await prismaClient.packageBundle.delete({
            where: {
                id: id,
                company_id : company.id
            }
        })
        return {message: "Deleted"}
    }

    static async getPackageBundle (company: Company) : Promise<PackageBundlesResponse> {

        const response = await prismaClient.packageBundle.findMany({
            where: {
                company_id: company.id
            },
            orderBy: {
                created_at: "desc"
            }
        })

        return {
            message: "Success",
            company_id: company.id,
            data: response
        }
    }
}