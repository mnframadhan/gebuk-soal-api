import { z, ZodType } from "zod";

export class PackageBundleValidation {

    static readonly CREATE : ZodType = z.object({

        package_name : z.string().min(3).max(50),
        expired_date : z.string(),
        max_duration : z.number().min(10).max(1000).optional(),
        n_unit : z.number().min(1).max(1000).optional(),

    })

    static readonly UPDATE : ZodType = z.object({

        package_name : z.string().min(3).max(50).optional(),
        expired_date : z.string().optional(),
        max_duration : z.number().min(10).max(1000).optional(),
        n_unit : z.number().min(1).max(1000).optional(),

    })

}