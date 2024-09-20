import { z, ZodType } from "zod";

export class PackageBundleValidation {

    static readonly CREATE : ZodType = z.object({

        package_name : z.string().min(3).max(50),
        expired_date : z.string(),

    })

    static readonly UPDATE : ZodType = z.object({

        package_name : z.string().min(3).max(50).optional(),
        expired_date : z.string().optional()

    })

}