"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidation = void 0;
const zod_1 = require("zod");
class StudentValidation {
}
exports.StudentValidation = StudentValidation;
StudentValidation.CREATE = zod_1.z.object({
    username: zod_1.z.string().min(3).max(100),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(100),
});
StudentValidation.LOGIN = zod_1.z.object({
    username: zod_1.z.string().min(3).max(100),
    password: zod_1.z.string().min(8).max(100),
});
StudentValidation.UPDATE = zod_1.z.object({
    username: zod_1.z.string().min(3).max(100).optional(),
    avatar: zod_1.z.string().min(1).optional(),
});
