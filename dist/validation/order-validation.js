"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
class OrderValidation {
}
exports.OrderValidation = OrderValidation;
OrderValidation.CREATE = zod_1.z.object({
    qty: zod_1.z.number().min(1).max(100),
});
