import { Response, NextFunction } from "express"
import { prismaClient } from "../application/database";
import { ContributorReq } from "../types/contributor-request";

export const authMiddleware = async (req: ContributorReq, res: Response, next: NextFunction) => {

    const token = req.get('X-API-TOKEN');

    if(token) {
        const contributor = await prismaClient.contributor.findFirst({
            where: {
                token: token
            }
        })

        if (contributor) {
            req.contributor = contributor;
            next();
            return;
        }
    }

    res.status(401).json({
        errors: "Unauthorized"
    }).end();
}