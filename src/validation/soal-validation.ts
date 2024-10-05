import { z, ZodType } from "zod";

export class SoalValidation {

    static readonly CREATE : ZodType = z.object({

        category: z.string().min(2),
        label: z.string().max(100).optional(),
        text: z.string(),
        question: z.string().max(10000).optional(),
        option1: z.string().max(500).optional(),
        option2: z.string().max(500).optional(),
        option3: z.string().max(500).optional(),
        option4: z.string().max(500).optional(),
        option5: z.string().max(500).optional(),
        correct_answer: z.string().min(1),
        explanation: z.string().min(4).max(10000).optional(),
    });
};