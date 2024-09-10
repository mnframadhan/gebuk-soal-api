"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const database_1 = require("../application/database");
const order_model_1 = require("../model/order-model");
const Validation_1 = require("../validation/Validation");
const order_validation_1 = require("../validation/order-validation");
const uuid_1 = require("uuid");
class OrderService {
    static createOrder(request, student) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate Order
            const validatedRequest = Validation_1.Validation.validate(order_validation_1.OrderValidation.CREATE, request);
            const id = (0, uuid_1.v4)();
            // calculate sub_total
            const sub_total = validatedRequest.qty * 2000;
            const data = Object.assign(Object.assign({ id: id }, validatedRequest), { student_id: student.id, sub_total: sub_total });
            // insert into database
            const response = yield database_1.prismaClient.order.create({
                data: data
            });
            // return response
            return (0, order_model_1.toOrderResonse)(response);
        });
    }
    static cancelOrder(orderID, student) {
        return __awaiter(this, void 0, void 0, function* () {
            // update order status to cancelled
            const response = yield database_1.prismaClient.order.update({
                where: {
                    id: orderID,
                    student_id: student.id
                },
                data: {
                    status: "Cancelled"
                }
            });
            return { message: `Cancelled: ${response.id}` };
        });
    }
    // administrator scope
    static getOrderByStudentID(student, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const pagination = {
                size: limit,
                total_page: Math.ceil(Number((yield database_1.prismaClient.order.count({
                    where: {
                        student_id: student.id
                    }
                })) / limit)),
                current_page: page
            };
            const order = yield database_1.prismaClient.order.findMany({
                where: {
                    student_id: student.id
                },
                orderBy: {
                    order_date: "desc"
                },
                skip: skip,
                take: limit
            });
            if (!order) {
                throw new Error("Not Found");
            }
            return (0, order_model_1.toOrderResponsePagination)(order, pagination);
        });
    }
}
exports.OrderService = OrderService;
