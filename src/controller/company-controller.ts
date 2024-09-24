import { NextFunction, Request, Response } from "express";
import { CompanyLoginRequest, CompanyRegisterRequest } from "../model/company-model";
import { CompanyService } from "../service/company-service";
import { CompanyReq } from "../types/company-request";
import { bucket } from "../application/firebase";

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

            res.cookie('X-API-TOKEN-COMPANY', response.token!, {httpOnly: false, maxAge: 1000*60*60*24})
            
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

    static async updateProfileBanner(req: CompanyReq, res: Response, next: NextFunction) {

        try {
            const file = req.file;

            if (!file) {
                res.status(400);
                res.json({message: "No file uploaded"})
            } else {
                
                const blob = bucket.file(`company/banner/${req.company!.brand_name}_${Date.now()}_${file.originalname}`)

                const blobStream = blob.createWriteStream({
                    metadata: {
                        contentType: file.mimetype,
                    }
                });

                blobStream.on('error', (error) => {
                    next(error)
                });

                blobStream.on('finish', async () => {

                    try {

                        await blob.makePublic();

                        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    
                        const request = req.body as {imageUrl: string}
                        request.imageUrl = publicUrl;
    
                        const response = await CompanyService.updateProfileBanner(request, req.company!)
                        res.status(200).json(response)

                    } catch (err) {
                        next(err)
                    }
                })

                blobStream.end(file.buffer);
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

	static async orderStandardPackage(req: CompanyReq, res: Response, next: NextFunction) {

			try {
				const response = await CompanyService.orderStandardPackage(req.company!)
				res.status(200);
				res.json(response);

			} catch (err) { next(err) }

	} 
}
