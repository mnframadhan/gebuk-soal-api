import { z, ZodType } from "zod";

export class OrderValidation {

    static readonly CREATE : ZodType = z.object({

        qty: z.number().min(1).max(50),

    })
}