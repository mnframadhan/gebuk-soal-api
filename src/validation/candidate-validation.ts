import { z, ZodType } from "zod";

export class CandidateValidation {

    static readonly CREATE : ZodType = z.object({

        student_id : z.string(),
        full_name: z.string(),
        email: z.string().email(),
        phone: z.string().min(4).max(15),
        cv: z.string().max(100),
        created_at: z.string()

    })

    static readonly UPDATE : ZodType = z.object({

        full_name: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
        cv: z.string().optional(),

    })

}