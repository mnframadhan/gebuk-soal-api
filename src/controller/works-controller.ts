import { NextFunction, Response } from "express";
import { WorksRequest } from "../model/works-model";
import { WorksService } from "../service/works-service";
import { StudentReq } from "../types/student-request";

export class WorksController {

    static async getRemainingLimit(req: StudentReq, res: Response, next: NextFunction) {

        try {

            const response = await WorksService.getRemainingLimit(req.student!);
            res.status(200);
            res.json(response);

        } catch (err) {
            next(err)

        }

    }

    static async getWorks(req: StudentReq, res: Response, next: NextFunction) {
        try {

            const category : string = req.query.category as string;
            const page : number = Number(req.query.page);
            const response = await WorksService.getWorks(req.student!, category, page)
            
            res.status(200);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }

    static async createWorks(req: StudentReq, res: Response, next: NextFunction) {

        try {

            const soal : string = req.query.soal as string;
            const request : WorksRequest = req.body as WorksRequest;
            const response = await WorksService.createWorks(request, req.student!, soal)

            res.status(201);
            res.json(response)

        } catch (err) {
            next(err);
        }
    }

    static async createTodayResults(req: StudentReq, res: Response, next: NextFunction) {

        try {
            const response = await WorksService.setTodayWorks(req.student!)
            res.status(201);
            res.json(response)
        } catch (err) {
            next(err)
        }
    }

    static async getTodayResults(req: StudentReq, res: Response, next: NextFunction) {

        try {
            const response = await WorksService.getTodayWorks(req.student!)
            res.status(200);
            res.json(response)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

	static async getWorksDateStreak(req: StudentReq, res: Response, next: NextFunction) {
		try {
			const response = await WorksService.getWorksDateStreak(req.student!)
			res.status(200);
			res.json(response)
		} catch (err) {
			next(err)
		}
	}
}
