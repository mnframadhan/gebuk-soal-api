import { PackageBundle, Student } from "@prisma/client";
import { Request } from "express";

export interface PackageBundleReq extends Request {
    packageBundle? : PackageBundle;
    student? : Student;
}
