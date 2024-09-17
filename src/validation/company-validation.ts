import { z, ZodType } from "zod";

export class CompanyValidation {

    static readonly REGISTER : ZodType = z.object({

        brand_name : z.string().min(4).max(100),
        legal_name: z.string().min(4).max(100),
        email : z.string().email(),
        phone : z.string().min(4).max(14),
        password: z.string().min(4).max(100),
        sector : z.string(),
        sub_sector: z.string().optional(),
        n_employee : z.string(),
        address : z.string().min(5).max(100)

    })

    static readonly LOGIN : ZodType = z.object({

        email: z.string().email().min(4).max(100),
        password: z.string().min(4).max(100)

    })


}