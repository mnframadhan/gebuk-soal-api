import { Company } from "@prisma/client";
import { Request } from "express";

export interface CompanyReq extends Request {
    company? : Company
}