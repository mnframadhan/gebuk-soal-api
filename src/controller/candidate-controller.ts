import { NextFunction, Response } from "express";
import { StudentReq } from "../types/student-request";
import { CandidateCreateRequest, CandidateUpdateRequest } from "../model/candidate-model";
import { CandidateService } from "../service/candidate-service";
import { PackageBundleResponseDetails } from "../model/package-bundle-model";
import { PackageBundleReq } from "../types/package-bundle-request";

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