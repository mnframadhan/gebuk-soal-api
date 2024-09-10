import { Contributor } from "@prisma/client";
import { Request } from "express";

export interface ContributorReq extends Request {
    contributor? : Contributor
}