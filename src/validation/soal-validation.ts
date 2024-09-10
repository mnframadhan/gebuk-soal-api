import { z, ZodType } from "zod";

export class SoalValidation {

    static readonly CREATE : ZodType = z.object({

        type: z.string().min(2),
        category: z.string().min(2),
        label: z.string().min(4).max(100),
        text: z.string(),
        text2: z.string().optional(),
        text3: z.string().optional(),
        text4: z.string().optional(),
        text5: z.string().optional(),
        image1: z.string().optional(),
        image2: z.string().optional(),
        image3: z.string().optional(),
        image4: z.string().optional(),
        image5: z.string().optional(),
        question: z.string().min(1).max(10000),
        option1: z.string().min(1).max(500).optional(),
        option2: z.string().min(1).max(500).optional(),
        option3: z.string().min(1).max(500).optional(),
        option4: z.string().min(1).max(500).optional(),
        option5: z.string().min(1).max(500).optional(),
        option_image1: z.string().min(5).max(100).endsWith(".jpg").optional(),
        option_image2: z.string().min(5).max(100).optional(),
        option_image3: z.string().min(5).max(100).optional(),
        option_image4: z.string().min(5).max(100).optional(),
        option_image5: z.string().min(5).max(100).optional(),        
        answer: z.string().min(1),
        explanation: z.string().min(4).max(10000).optional(),
        explanation_image1: z.string().min(5).max(100).optional(),
        explanation_image2: z.string().min(5).max(100).optional(),
        explanation_image3: z.string().min(5).max(100).optional(),
        explanation_image4: z.string().min(5).max(100).optional(),
        explanation_image5: z.string().min(5).max(100).optional()
    });
};