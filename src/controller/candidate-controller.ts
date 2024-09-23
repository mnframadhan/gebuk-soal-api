import { NextFunction, Response } from "express";
import { StudentReq } from "../types/student-request";
import { CandidateCreateRequest, CandidateUpdateRequest } from "../model/candidate-model";
import { CandidateService } from "../service/candidate-service";
import { PackageBundleResponseDetails } from "../model/package-bundle-model";
import { PackageBundleReq } from "../types/package-bundle-request";
import { PackageTestUnitsWorksRequest } from "../model/package-test-unit-model";

export class CandidateController {

    static async createCandidate(req: StudentReq, res: Response, next: NextFunction) {

        try {

            const request: CandidateCreateRequest = req.body as CandidateCreateRequest;
            const response = await CandidateService.createCandidate(request, req.student!);

            res.status(201);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }

    static async getCurrentCandidate(req: StudentReq, res: Response, next: NextFunction) {

        try {

            const response = await CandidateService.getCurrentCandidates(req.student!);
            res.status(200);
            res.json(response);

        } catch (err) { 
            next(err)
        }

    }

    static async checkPackageBundleToken(req: StudentReq, res: Response, next: NextFunction) {

        try {

            const package_bundle_token = req.query.package_bundle_token as string;
            const response = await CandidateService.checkPackageBundleToken(package_bundle_token)

            if(response.token) {
                res.cookie(
                    'PACKAGE-BUNDLE-TOKEN', 
                    response.token, 
                    {maxAge: 1000*60*60*24, httpOnly: false}
                );
            }

            res.status(200);
            res.json(response);

        } catch (err) {
            next(err)
        }
    }

    static async getPackageBundleById(req: PackageBundleReq, res: Response, next: NextFunction) {

        try {

            const response : PackageBundleResponseDetails = await CandidateService.getPackageBundleById(req.packageBundle!, req.student!)

            res.status(200);
            res.json(response);

        } catch (err) {
            next(err)
        }

    }

    static async getPackageTestUnitsByPackageBundleIdPagination(req: PackageBundleReq, res: Response, next: NextFunction) {

        try {

            const page = parseInt(req.query.page as string);
            const response = await CandidateService.getPackageTestUnitByPackageBundleIdPagination(page, req.packageBundle!, req.student!);

            res.status(200);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }

    static async createWorks(req: StudentReq, res: Response, next: NextFunction ) {

        try {

            const package_test_unit_id : string =  req.query.package_test_unit_id as string;
            const request: PackageTestUnitsWorksRequest = req.body as PackageTestUnitsWorksRequest;
            const response = await CandidateService.createWorks(request, package_test_unit_id, req.student!)

            res.status(201);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }
    
    static async updateCandidate(req: StudentReq, res: Response, next: NextFunction) {

        try {

            const request: CandidateUpdateRequest = req.body as CandidateUpdateRequest;
            const response = await CandidateService.updateCandidate(request, req.student!);

            res.status(200);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }
}