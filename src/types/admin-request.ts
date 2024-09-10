import { Administrator } from "@prisma/client";
import { Request } from "express";

export interface AdminReq extends Request {
    admin? : Administrator
}