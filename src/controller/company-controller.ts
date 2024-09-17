import { NextFunction, Request, Response } from "express";
import { CompanyLoginRequest, CompanyRegisterRequest } from "../model/company-model";
import { CompanyService } from "../service/company-service";
import { CompanyReq } from "../types/company-request";

export class CompanyController {

    static async createCompany(req: Request, res: Response, next: NextFunction) {

        try {

            const request : CompanyRegisterRequest = req.body as CompanyRegisterRequest;
            const response = await CompanyService.createCompany(request);

            res.status(201);
            res.json(response);

        } catch (err) {

            next(err);

        }
    }

    static async loginCompany(req: Request, res: Response, next: NextFunction ) {

        try {

            const request: CompanyLoginRequest = req.body as CompanyLoginRequest;
            const response = await CompanyService.loginCompany(request);

            res.cookie('X-API-TOKEN-COMPANY', response.token!, {httpOnly: false, maxAge: 1000*60*60})
            
            res.status(200);
            res.json(response);

        } catch (err) {

            next(err);

        }
    }

    static async logoutCompany(req: CompanyReq, res: Response, next: NextFunction) {

        try {
            const response = await CompanyService.logoutCompany(req.company!);

            res.clearCookie('X-API-TOKEN-COMPANY', {path: '/'});

            res.status(200);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }

    static async getCurrentCompany(req: CompanyReq, res: Response, next: NextFunction){
        
        try{

            const response = await CompanyService.getCurrentCompany(req.company!);
            res.status(200);
            res.json(response);

        } catch (err) {
            next(err);
        }
        
    }
}