import { Response, NextFunction, Request } from "express"
import { prismaClient } from "../application/database";
import { AdminReq } from "../types/admin-request";

export const authAdminMiddleware = async (req: AdminReq, res: Response, next: NextFunction) => {

    const token = req.get('X-API-TOKEN-ADMIN');

    if(token) {
        const admin = await prismaClient.administrator.findFirst({
            where: {
                token: token
            }
        })

        if (admin) {
            req.admin = admin;
            next();
            return;
        }
    }

    res.status(401).json({
        errors: "Unauthorized"
    }).end();
}