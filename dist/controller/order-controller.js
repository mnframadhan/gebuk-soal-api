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
exports.OrderController = void 0;
const order_service_1 = require("../service/order-service");
class OrderController {
    static createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield req.body;
                const response = yield order_service_1.OrderService.createOrder(request, req.student);
                res.status(201);
                res.json(response);
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
    static cancelOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderID = req.query.order_id;
                const response = yield order_service_1.OrderService.cancelOrder(orderID, req.student);
                res.status(200);
                res.json(response);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getOrderHistory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.params.page) | 1;
                const limit = parseInt(req.params.limit) | 10;
                const response = yield order_service_1.OrderService.getOrderByStudentID(req.student, page, limit);
                res.status(200);
                res.json(response);
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
    static premiumOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield order_service_1.OrderService.premiumOrder(req.student);
                res.status(200);
                res.json(response);
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
}
exports.OrderController = OrderController;
