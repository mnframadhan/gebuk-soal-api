import { NextFunction, Response } from "express";
import { prismaClient } from "../application/database";
import { CompanyReq } from "../types/company-request";

export const authCompanyMiddleware = async (req: CompanyReq, res: Response, next: NextFunction) => {

    const token = req.get('X-API-TOKEN-COMPANY');

    if(token) {
        const company = await prismaClient.company.findFirst({
            where: {
                token: token
            }
        })

        if (company) {
            req.company = company;
            next();
            return;
        }
    }

    res.status(401).json({
        errors: "Unauthorized"
    }).end();
}