import { NextFunction, Response } from "express";
import { ContributorReq } from "../types/contributor-request";
import { CompletePackageServices } from "../service/complete-package-service";
import { CompletePackageRequest } from "../model/complete-package-model";
import { StudentReq } from "../types/student-request";

export class CompletePackageControllers {
    static async createCompletePackage(req: ContributorReq, res: Response, next: NextFunction) {
        try {
            const request: CompletePackageRequest = req.body as CompletePackageRequest;
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
            next(err);
        }
    }

    static async getAllCompletePackages(req: StudentReq, res: Response, next: NextFunction) {
        try {
            const response = await CompletePackageServices.getAllCompletePackages();
            res.status(200);
            res.json(response);
        } catch (err) {
            next(err);
        }
    }

    static async getCompletePackageById(req: StudentReq, res: Response, next: NextFunction) {
        try {
            const complete_package_id = req.params.id as string;
            const response = await CompletePackageServices.getCompletePackageById(complete_package_id);
            res.status(200);
            res.json(response);
        } catch (err) {
            next(err);
        }
    }

	static async orderCompletePackageId(req: StudentReq, res: Response, next: NextFunction) {
		try {
            const complete_package_id = req.params.id as string;
			const request: {password: string} = req.body as {password: string};
            const response = await CompletePackageServices.orderCompletePackage(request, complete_package_id, req.student!);
			
            res.status(200);
            res.json(response);
		} catch (err) {
			next(err)
		}
	}
}
