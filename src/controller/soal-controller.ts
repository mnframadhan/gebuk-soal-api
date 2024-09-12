import { Response, NextFunction, Request } from "express";
import { SoalRequest } from "../model/soal-model";
import { SoalService } from "../service/soal-service";
import { ContributorReq } from "../types/contributor-request";
import { StudentReq } from "../types/student-request";

export class SoalController {

    static async createSoal(req: ContributorReq, res: Response, next: NextFunction){

        try {

            const request : SoalRequest = await req.body as SoalRequest
            const response = await SoalService.createSoal(request, req.contributor!)
            
            res.status(201);
            res.json(response)

        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    // static async getSoalPagination(req: StudentReq, res: Response, next: NextFunction) {

    //     try {

    //         const limit = req.query.limit
    //         const response = await SoalService.getSoal(Number(limit))
            
    //         res.status(200);
    //         res.json(response);

    //     } catch (err) {

    //         console.log(err)
    //         next(err)

    //     }
    // }
}