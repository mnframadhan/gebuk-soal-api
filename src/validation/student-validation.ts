import { z, ZodType } from "zod";

export class StudentValidation {

    static readonly CREATE : ZodType = z.object({

        username: z.string().min(3).max(100),
        email: z.string().email(),
        password: z.string().min(8).max(100),
    
    })

    static readonly LOGIN : ZodType = z.object({

        username: z.string().min(3).max(100),
        password: z.string().min(8).max(100),

    })

    static readonly UPDATE : ZodType = z.object({

        username: z.string().min(3).max(100).optional(),
        avatar: z.string().min(1).optional(),

    })
}