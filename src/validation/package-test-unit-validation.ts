import { ZodType, z } from "zod"

export class PackageTestUnitValidation {

    static readonly CREATE : ZodType = z.object({

        ord : z.number().min(1).max(300),
        label: z.string().optional(),
        text: z.string(),
        text_image: z.string().optional(),
        question: z.string().optional(),
        option1: z.string(),
        option1_point: z.number().optional(),
        option1_image: z.string().optional(),
        option2: z.string(),
        option2_point: z.number().optional(),
        option2_image: z.string().optional(),
        option3_point: z.number().optional(),
        option3_image: z.string().optional(),
        option4_point: z.number().optional(),
        option5: z.string().optional(),
        option5_point: z.number().optional(),
        option5_image: z.string().optional(),
        unique_answer: z.string().optional(),
    })

    static readonly UPDATE : ZodType = z.object({

        ord: z.number().min(1).max(300).optional(),
        label: z.string().optional(),
        category: z.string().optional(),
        text: z.string().optional(),
        option1: z.string().optional(),
        option1_point: z.number().optional(),
        option1_image: z.string().optional(),
        option2: z.string().optional(),
        option2_point: z.number().optional(),
        option2_image: z.string().optional(),
        option3_point: z.number().optional(),
        option3_image: z.string().optional(),
        option4_point: z.number().optional(),
        option5: z.string().optional(),
        option5_point: z.number().optional(),
        option5_image: z.string().optional(),
        unique_answer: z.string().optional(),
        explanation: z.string().optional(),
        explanation_image: z.string().optional()

    })
}