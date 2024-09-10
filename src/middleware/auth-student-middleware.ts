import { Response, NextFunction } from "express";
import { StudentReq } from "../types/student-request";
import { prismaClient } from "../application/database";

export const authStudentMiddleware = async (req: StudentReq , res: Response, next: NextFunction) => {

    const token = req.get('X-API-TOKEN-STUDENT');

    if(token) {

        const student = await prismaClient.student.findFirst({
            where: {
                token: token
            }
        })

        if (student) {
            req.student = student;
            next();
            return;
        }

        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    }
}