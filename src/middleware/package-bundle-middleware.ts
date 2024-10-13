import { Response, NextFunction } from "express";
import { PackageBundleReq } from "../types/package-bundle-request";
import { prismaClient } from "../application/database";


export const packageBundleMiddleware = async (req: PackageBundleReq, res: Response, next: NextFunction) => {

    const packageBundleToken = req.get('PACKAGE-BUNDLE-TOKEN');
    const studentToken = req.get('X-API-TOKEN-STUDENT');

    if(packageBundleToken && studentToken) {
        
        const packageBundle = await prismaClient.packageBundle.findFirst({
            where: {
                token: packageBundleToken
            }
        })

        const student = await prismaClient.student.findFirst({
            where: {
                token: studentToken
            }
        })

        if (packageBundle && student) {
            req.packageBundle = packageBundle;
            req.student = student;
            next();
            return;
        }

        res.status(401).json({
            message: "Unauthorized"
        }).end();
    }
}
