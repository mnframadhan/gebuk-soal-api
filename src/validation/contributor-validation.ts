import { z, ZodType } from "zod";

export class ContributorValidation {

    static readonly CREATE : ZodType = z.object({
        username : z.string().min(4).max(50),
        email : z.string().email(),
        password : z.string().min(8).max(20)
    })

    static readonly LOGIN : ZodType = z.object({
        username : z.string().min(4).max(50),
        password : z.string().min(8).max(20)
    })
}