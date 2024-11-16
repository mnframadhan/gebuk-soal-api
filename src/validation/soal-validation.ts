import { z, ZodType } from "zod";

export class SoalValidation {
    static readonly CREATE: ZodType = z.object({
        category: z.string().min(2),
        sub_category: z.string().optional(),
        cpns_category: z.string().optional(),
        label: z.string().max(100).optional(),
        text: z.string(),
        difficulty: z.string(),
        question: z.string().max(10000).optional(),
        option1: z.string().max(500).optional(),
        option2: z.string().max(500).optional(),
        option3: z.string().max(500).optional(),
        option4: z.string().max(500).optional(),
        option5: z.string().max(500).optional(),
        correct_answer: z.string().min(1),
        explanation: z.string().min(4).max(10000).optional(),
        explanation_url_youtube_video: z.string().max(1000).optional(),
		complete_package_id: z.string().optional(),
		orders: z.string().optional(),
		is_protected: z.boolean().optional()
    });
}

export class CompletePackageValidation {

	static readonly CREATE: ZodType = z.object({
		package_name: z.string(),
		category: z.string(),
		expired_date: z.string(),
		n_unit: z.number(),
		difficulty: z.number(),
		price: z.number(),
		unique_selling_point1: z.string(),
		unique_selling_point2: z.string(),
		unique_selling_point3: z.string(),
	})
}
