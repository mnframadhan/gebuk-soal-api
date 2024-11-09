import { NextFunction, Response } from "express";
import { ContributorReq } from "../types/contributor-request";
import { CompletePackageServices } from "../service/complete-package-service";
import { CompletePackageRequest } from "../model/complete-package-model";

export class CompletePackageControllers {
    static async createCompletePackage(req: ContributorReq, res: Response, next: NextFunction) {
        try {
            const request : CompletePackageRequest = req.body as CompletePackageRequest;
            const response = await CompletePackageServices.createCompletePackage(request, req.contributor!);
            res.status(201);
            res.json(response);
        } catch (err) {
            next(err);
        }
    }

	static async getCompletePackage(req: ContributorReq, res: Response, next: NextFunction) {
		try {
			const response = await CompletePackageServices.getCompletePackage(req.contributor!);
			res.status(200);
			res.json(response);
		} catch (err) {
			next(err)
		}
	}
}
