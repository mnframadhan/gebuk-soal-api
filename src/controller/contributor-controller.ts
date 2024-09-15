import { NextFunction, Request, Response } from "express";
import { ContributorLoginRequest, ContributorRequest, ContributorResponse } from "../model/contributor-model";
import { ContributoService } from "../service/contributor-service";
import { ContributorReq } from "../types/contributor-request";

export class ContributorController {

    static async createContributor(req: Request, res: Response, next: NextFunction) {

        try {

            // define request and response
            const request : ContributorRequest = await req.body as ContributorRequest;
            const response : ContributorResponse = await ContributoService.createContributor(request)

            // defined response status and json response
            res.status(201)
            res.json(response)
        } catch (err) {
            next(err)

        }
    }

    static async loginContributor(req: Request, res: Response, next: NextFunction) {

        try {

            const request: ContributorLoginRequest = await req.body as ContributorLoginRequest;
            const response: ContributorResponse = await ContributoService.loginContributor(request);

            const token : string = response.token as string;
            res.cookie('X-API-TOKEN', token, {
                httpOnly: false, 
                maxAge: 24 * 60 * 60 * 1000, // Cookie expiry time (e.g., 1 day in milliseconds)
              });

            res.status(201)
            res.json(response)

        } catch (err) {

            console.log(err);
            next(err)

        }

    }

    static async getSoalCreated(req: ContributorReq, res: Response, next: NextFunction) {

        try {
            const limit : number = Number(req.query.limit);
            const page : number = Number(req.query.page);
            const response = await ContributoService.getSoalCreated(page, limit, req.contributor! )

            res.status(200);
            res.json(response);
        } catch (err) {
            next(err)
        }

    }

    static async currentContributor (req: ContributorReq, res: Response, next: NextFunction) {

        try {

            const response = await ContributoService.getCurrentContributor(req.contributor!)

            res.status(200);
            res.json(response);

        } catch (err) {

            next(err)
        }
    }

    static async logoutContributor (req: ContributorReq, res: Response, next: NextFunction) {

        try {
            
            await ContributoService.logoutCurrentContributor(req.contributor!)
            res.status(200);
            res.json({message: "OK"})
        } catch (err) {
            next(err)
        }
    }
}