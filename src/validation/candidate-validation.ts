import { z, ZodType } from "zod";

export class CandidateValidation {

    static readonly CREATE : ZodType = z.object({

        full_name: z.string(),
        phone: z.string().min(4).max(15),
        address: z.string().min(4).max(100)

    })

    static readonly UPDATE : ZodType = z.object({

        full_name: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),

    })

}