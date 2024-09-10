"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoalValidation = void 0;
const zod_1 = require("zod");
class SoalValidation {
}
exports.SoalValidation = SoalValidation;
SoalValidation.CREATE = zod_1.z.object({
    type: zod_1.z.string().min(2),
    category: zod_1.z.string().min(2),
    label: zod_1.z.string().min(4).max(100),
    text: zod_1.z.string(),
    text2: zod_1.z.string().optional(),
    text3: zod_1.z.string().optional(),
    text4: zod_1.z.string().optional(),
    text5: zod_1.z.string().optional(),
    image1: zod_1.z.string().optional(),
    image2: zod_1.z.string().optional(),
    image3: zod_1.z.string().optional(),
    image4: zod_1.z.string().optional(),
    image5: zod_1.z.string().optional(),
    question: zod_1.z.string().min(1).max(10000),
    option1: zod_1.z.string().min(1).max(500).optional(),
    option2: zod_1.z.string().min(1).max(500).optional(),
    option3: zod_1.z.string().min(1).max(500).optional(),
    option4: zod_1.z.string().min(1).max(500).optional(),
    option5: zod_1.z.string().min(1).max(500).optional(),
    option_image1: zod_1.z.string().min(5).max(100).endsWith(".jpg").optional(),
    option_image2: zod_1.z.string().min(5).max(100).optional(),
    option_image3: zod_1.z.string().min(5).max(100).optional(),
    option_image4: zod_1.z.string().min(5).max(100).optional(),
    option_image5: zod_1.z.string().min(5).max(100).optional(),
    answer: zod_1.z.string().min(1),
    explanation: zod_1.z.string().min(4).max(10000).optional(),
    explanation_image1: zod_1.z.string().min(5).max(100).optional(),
    explanation_image2: zod_1.z.string().min(5).max(100).optional(),
    explanation_image3: zod_1.z.string().min(5).max(100).optional(),
    explanation_image4: zod_1.z.string().min(5).max(100).optional(),
    explanation_image5: zod_1.z.string().min(5).max(100).optional()
});
;
