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
exports.AdministratorController = void 0;
const administrator_service_1 = require("../service/administrator-service");
class AdministratorController {
    static createAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield administrator_service_1.AdministratorService.createAdmin(request);
                res.status(201);
                res.json(response);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    static loginAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield req.body;
                const response = yield administrator_service_1.AdministratorService.loginAdmin(request);
                const token = response.token;
                res.cookie('X-API-TOKEN-ADMIN', token, {
                    httpOnly: false,
                    maxAge: 24 * 60 * 60 * 1000, // Cookie expiry time (e.g., 1 day in milliseconds)
                });
                res.status(201);
                res.json(response);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    static getAllOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const response = yield administrator_service_1.AdministratorService.getAllOrders(page, limit);
                res.status(200);
                res.json(response);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    static getAllStudents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const response = yield administrator_service_1.AdministratorService.getAllStudents(page, limit);
                res.status(200);
                res.json(response);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    static updateStudentLimit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student_id = req.query.student_id;
                const order_id = req.query.order_id;
                const request = req.body;
                const response = yield administrator_service_1.AdministratorService.updateStudentLimit(request, student_id, order_id);
                res.status(200);
                res.json(response);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    static updatePremiumStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student_id = req.query.student_id;
                const response = yield administrator_service_1.AdministratorService.updatePremiumStudent(student_id);
                res.status(200);
                res.json(response);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    static returnLimit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student_id = req.query.student_id;
                const order_id = req.query.order_id;
                const request = req.body;
                const response = yield administrator_service_1.AdministratorService.returnLimit(request, student_id, order_id);
                res.status(200);
                res.json(response);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    static logoutAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield administrator_service_1.AdministratorService.logoutCurrentAdmin(req.admin);
                res.status(200);
                res.json({ message: "OK" });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.AdministratorController = AdministratorController;
