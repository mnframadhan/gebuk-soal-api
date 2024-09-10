"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoalTIUValidation = void 0;
const zod_1 = require("zod");
class SoalTIUValidation {
}
exports.SoalTIUValidation = SoalTIUValidation;
SoalTIUValidation.CREATE = zod_1.z.object({
    type: zod_1.z.string().min(2),
    label: zod_1.z.string().min(4).max(100),
    text: zod_1.z.string().optional(),
    question: zod_1.z.string().min(1).max(1000),
    option1: zod_1.z.string().min(1).max(500),
    option2: zod_1.z.string().min(1).max(500),
    option3: zod_1.z.string().min(1).max(500),
    option4: zod_1.z.string().min(1).max(500),
    option5: zod_1.z.string().min(1).max(500),
    answer: zod_1.z.string().min(1),
    explanation: zod_1.z.string().min(4).max(500)
});
;
