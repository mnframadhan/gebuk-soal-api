import { NextFunction, Response } from "express";
import { CompanyReq } from "../types/company-request";
import { PackageTestUnitService } from "../service/package-test-unit-service";
import { PackageTestUnitCreateRequest } from "../model/package-test-unit-model";

export class PackageTestUnitController {

    static async createPackageTestUnit(req: CompanyReq, res: Response, next: NextFunction) {

        try {

            const package_bundle_id = req.query.package_bundle_id as string;
            const request : PackageTestUnitCreateRequest = req.body as PackageTestUnitCreateRequest;
            const response = await PackageTestUnitService.createPackageTestUnit(package_bundle_id, request, req.company!);

            res.status(201);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }

    static async updatePackageTestUnit(req: CompanyReq, res: Response, next: NextFunction) {

        try {

            const package_test_unit_id = req.params.package_test_unit_id as string;
            const request : PackageTestUnitCreateRequest = req.body as PackageTestUnitCreateRequest;
            const response = await PackageTestUnitService.updatePackageTestUnit(package_test_unit_id, request, req.company!);

            res.status(200);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }

    static async deletePackageTestUnit(req: CompanyReq, res: Response, next: NextFunction) {

        try {

            const package_test_unit_id = req.query.package_test_unit_id as string;
            const package_bundle_id = req.query.package_bundle_id as string;
            const response = await PackageTestUnitService.deletePackageTestUnit(package_bundle_id, package_test_unit_id, req.company!);

            res.status(200);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }

    static async getPackageTestUnitByPackageBundleId(req: CompanyReq, res: Response, next: NextFunction) {
        try {

            const package_bundle_id = req.params.package_bundle_id as string;
            const response = await PackageTestUnitService.getPackageTestUnitByPackageBundleId(package_bundle_id, req.company!);

            res.status(200);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }
}