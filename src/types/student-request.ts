import { Student } from "@prisma/client";
import { Request } from "express";

export interface StudentReq extends Request {
    student? : Student
}