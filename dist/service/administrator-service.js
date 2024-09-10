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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministratorService = void 0;
const database_1 = require("../application/database");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_error_1 = require("../error/response-error");
class AdministratorService {
    static createAdmin(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // prepare data
            const encryptedPassword = yield bcrypt_1.default.hash(request.password, 10);
            const data = {
                id: (0, uuid_1.v4)(),
                username: request.username,
                password: encryptedPassword
            };
            // insert into database
            const administrator = yield database_1.prismaClient.administrator.create({
                data: data
            });
            const response = {
                username: administrator.username
            };
            // return response
            return response;
        });
    }
    static loginAdmin(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let administrator = yield database_1.prismaClient.administrator.findFirst({
                where: {
                    username: request.username
                }
            });
            if (!administrator) {
                throw new response_error_1.ResponseError(401, "Email or Password incorret");
            }
            const passwordMatch = yield bcrypt_1.default.compare(request.password, administrator.password);
            if (!passwordMatch) {
                throw new response_error_1.ResponseError(401, "Email or Password incorret");
            }
            const token = String((0, uuid_1.v4)());
            administrator = yield database_1.prismaClient.administrator.update({
                where: {
                    username: request.username
                },
                data: {
                    token: token
                }
            });
            const response = {
                username: administrator.username,
                token: administrator.token
            };
            return response;
        });
    }
    static getAllStudents(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const pagination = {
                size: limit,
                total_page: Math.ceil(Number(yield database_1.prismaClient.student.count({})) / limit),
                current_page: page
            };
            const student = yield database_1.prismaClient.student.findMany({
                skip: skip,
                take: limit,
                orderBy: {
                    created_at: 'desc'
                }
            });
            return {
                pagination: pagination,
                data: student
            };
        });
    }
    static getAllOrders(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const pagination = {
                size: limit,
                total_page: Math.ceil(Number(yield database_1.prismaClient.order.count({})) / limit),
                current_page: page
            };
            const student = yield database_1.prismaClient.order.findMany({
                skip: skip,
                take: limit,
                orderBy: {
                    order_date: 'desc'
                }
            });
            return {
                pagination: pagination,
                data: student
            };
        });
    }
    static updateStudentLimit(request, student_id, order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield database_1.prismaClient.student.update({
                where: {
                    id: student_id
                },
                data: {
                    quota: {
                        increment: request.limit
                    },
                    membership: "Plus"
                },
            });
            yield database_1.prismaClient.order.update({
                where: {
                    id: order_id,
                    student_id: student_id
                },
                data: {
                    status: "Completed"
                }
            });
            const response = {
                message: "updated",
                id: student.id
            };
            return response;
        });
    }
    static returnLimit(request, student_id, order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield database_1.prismaClient.student.update({
                where: {
                    id: student_id
                },
                data: {
                    quota: {
                        decrement: request.limit
                    }
                },
            });
            yield database_1.prismaClient.order.update({
                where: {
                    id: order_id,
                    student_id: student_id
                },
                data: {
                    status: "Returned"
                }
            });
            const response = {
                message: "Returned",
                id: student.id
            };
            return response;
        });
    }
    static logoutCurrentAdmin(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.administrator.update({
                where: {
                    username: admin.username
                },
                data: {
                    token: null
                }
            });
        });
    }
}
exports.AdministratorService = AdministratorService;
