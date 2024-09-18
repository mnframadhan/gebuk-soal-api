import { NextFunction, Response } from "express";
import { StudentReq } from "../types/student-request";
import { CandidateCreateRequest, CandidateUpdateRequest } from "../model/candidate-model";
import { CandidateService } from "../service/candidate-service";

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