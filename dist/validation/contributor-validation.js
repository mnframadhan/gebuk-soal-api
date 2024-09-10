"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributorValidation = void 0;
const zod_1 = require("zod");
class ContributorValidation {
}
exports.ContributorValidation = ContributorValidation;
ContributorValidation.CREATE = zod_1.z.object({
    username: zod_1.z.string().min(4).max(50),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(20)
});
ContributorValidation.LOGIN = zod_1.z.object({
    username: zod_1.z.string().min(4).max(50),
    password: zod_1.z.string().min(8).max(20)
});
