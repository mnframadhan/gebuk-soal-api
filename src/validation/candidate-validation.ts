import { z, ZodType } from "zod";

export class CandidateValidation {

    static readonly CREATE : ZodType = z.object({

		id_number: z.string().min(8).max(20),
        full_name: z.string().min(4).max(50),
        phone: z.string().min(4).max(15),
        address: z.string().min(4).max(100),
		city: z.string().min(3).max(100),
		district: z.string().min(3).max(100),
		sub_district: z.string().min(3).max(100),
		postal_code: z.string().min(3).max(100),
		

    })

    static readonly UPDATE : ZodType = z.object({

        full_name: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),

    })

    static readonly WORK : ZodType = z.object({

        selected_answer: z.string()

    })

    static readonly DONE : ZodType = z.object({

        start_time: z.string(),
        end_time: z.string()

    })
}
