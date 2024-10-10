import { z, ZodType } from "zod";

export class StudentValidation {

    static readonly CREATE : ZodType = z.object({

        username: z.string().min(3).max(30),
        full_name: z.string().min(3).max(100),
        date_of_birth: z.string(),
        email: z.string().email(),
        password: z.string().min(8).max(100),
    
    })

    static readonly LOGIN : ZodType = z.object({

        username: z.string().min(3).max(30),
        password: z.string().min(8).max(100),

    })

    static readonly UPDATE : ZodType = z.object({

        username: z.string().min(3).max(30).optional(),
		full_name: z.string().min(3).max(100).optional(),
		date_of_birth: z.string().optional(),
		bio: z.string().optional(),
		education_name: z.string().optional(),
		is_present_education: z.boolean().optional(),
		start_year_education: z.string().min(4).max(4).optional(),
		end_year_education: z.string().min(4).max(4).optional(),
    })

	static readonly AVATAR_UPDATE : ZodType = z.object({
		avatar: z.string().min(4).max(200)
	})
}
