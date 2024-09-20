import { NextFunction, Response } from "express";
import { CompanyReq } from "../types/company-request";
import { PackageTestUnitService } from "../service/package-test-unit-service";
import { PackageTestUnitCreateRequest } from "../model/package-test-unit-model";
import { bucket } from "../application/firebase";

export class PackageTestUnitController {

    static async createPackageTestUnit(req: CompanyReq, res: Response, next: NextFunction) {

        try {

            const package_bundle_id = req.query.package_bundle_id as string;
            const request: PackageTestUnitCreateRequest = req.body as PackageTestUnitCreateRequest;
            const response = await PackageTestUnitService.createPackageTestUnit(package_bundle_id, request, req.company!);

            res.status(201);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }

    static async createPackageTestUnitWithImage(req: CompanyReq, res: Response, next: NextFunction) {

        try {

            const package_bundle_id = req.query.package_bundle_id as string;
            const file = req.file;

            if (!file) {
                res.status(400);
                res.json({ message: "No file uploaded" })
            } else {

                const blob = bucket.file(`package/package-test-unit/${req.company?.brand_name}_${Date.now()}_${file.originalname}`);
                const blobStream = blob.createWriteStream({
                    metadata: {
                        contentType: file.mimetype,
                    }
                });

                blobStream.on('error', (error) => {
                    next(error);
                });

                blobStream.on('finish', async () => {

                    try {

                        await blob.makePublic();

                        const publicUrl = `https://stroage.googleapis.com/${bucket.name}/${blob.name}`;
                        const request = req.body

                        request.text_image = publicUrl;

                        const response = await PackageTestUnitService.createPackageTestUnit(package_bundle_id, request, req.company!);

                        res.status(201);
                        res.json(response);
                    } catch (err) {
                        next(err);
                    }

                    blobStream.end(file.buffer);

                })
            }

        } catch (err) {
            next(err);
        }
    }

    static async updatePackageTestUnit(req: CompanyReq, res: Response, next: NextFunction) {

        try {

            const package_test_unit_id = req.params.package_test_unit_id as string;
            const request: PackageTestUnitCreateRequest = req.body as PackageTestUnitCreateRequest;
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
            const package_bundle_id = String(req.params.package_bundle_id);
            const response = await PackageTestUnitService.getPackageTestUnitByPackageBundleId(package_bundle_id, req.company!)

            res.status(200);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }
}