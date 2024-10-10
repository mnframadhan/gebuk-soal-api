import { Company } from "@prisma/client";
import { PackageBundleCreateRequest, PackageBundleResponse, PackageBundlesResponse, PackageBundleUpdateRequest } from "../model/package-bundle-model";
import { Validation } from "../validation/Validation";
import { PackageBundleValidation } from "../validation/package-bundle-validation";
import { prismaClient } from "../application/database";
import { v4 as uuid } from "uuid";

export class PackageBundleService {

    static async createPackageBundle (request: PackageBundleCreateRequest, company: Company) : Promise<PackageBundleResponse> {

        // validation
        const validatedRequest = Validation.validate(PackageBundleValidation.CREATE, request);

        // insert into database
        const created_at = String(Date.now());

        const response = await prismaClient.packageBundle.create({

            data: {
                ...validatedRequest, 
                company_id: company.id, 
                created_at: created_at,
            }
        })

        await prismaClient.company.update({
            where : {
                id: company.id
            },
            data: {n_package: {increment: 1}}
        })

        
        return response
    }

    static async updatePackageBundle (id: string, request: PackageBundleUpdateRequest, company: Company) : Promise<{message: string}> {

        // validation
        const validatedRequest = Validation.validate(PackageBundleValidation.UPDATE, request);

        await prismaClient.packageBundle.update({
            where: { id: id, company_id: company.id },
            data: {
              ...(validatedRequest.package_name && { package_name: validatedRequest.package_name }),
              ...(validatedRequest.expired_date && { expired_date: validatedRequest.expired_date }),
              ...(validatedRequest.max_duration !== undefined && { max_duration: validatedRequest.max_duration }),
              ...(validatedRequest.n_unit !== undefined && { n_unit: validatedRequest.n_unit }),
            },
          });
      
          return {message: "Updated"};
    }

    static async generateToken (package_bundle_id: string, company: Company) : Promise<{message: string}> {

        const token : string = uuid() as string;

        await prismaClient.packageBundle.update({
            where: {
                id: package_bundle_id,
                company_id: company.id
            },
            data: {
                token: token
            }
        })

        return {message: "Generated"}
    }

    static async deleteToken(package_bundle_id: string, company: Company) : Promise<{message: string}> {

        await prismaClient.packageBundle.update({
            where: {
                id: package_bundle_id,
                company_id: company.id
            },
            data: {
                token: null
            }
        })

        return {message: "Deleted"}
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
        })

		const responseOrdered = response.sort((a, b) => ( Number(b.created_at) - Number(a.created_at)) )

        return {
            message: "Success",
            company_id: company.id,
            data: responseOrdered
        }
    }

    static async getPackageBundleById (id: string, company: Company) : Promise<PackageBundleResponse> {

        const response = await prismaClient.packageBundle.findUnique({
            where: {
                id: id,
                company_id: company.id
            }
        }) as PackageBundleResponse;

        return response;
    }

}
