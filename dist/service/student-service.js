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
exports.StudentService = void 0;
const database_1 = require("../application/database");
const student_model_1 = require("../model/student-model");
const student_validation_1 = require("../validation/student-validation");
const Validation_1 = require("../validation/Validation");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_error_1 = require("../error/response-error");
class StudentService {
    static createStudent(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // validation
            const validatedRequest = Validation_1.Validation.validate(student_validation_1.StudentValidation.CREATE, request);
            // check if email already exists
            const numberOfEmail = yield database_1.prismaClient.student.count({
                where: {
                    email: validatedRequest.email
                }
            });
            if (numberOfEmail != 0) {
                throw new response_error_1.ResponseError(400, "Email already exists");
            }
            ;
            // prepare
            const student_id = (0, uuid_1.v4)();
            // hasing password
            const hashedPassword = yield bcrypt_1.default.hash(validatedRequest.password, 10);
            validatedRequest.password = hashedPassword;
            const data = Object.assign(Object.assign({}, validatedRequest), { id: student_id });
            // insert into database
            const response = yield database_1.prismaClient.student.create({
                data: data
            });
            return (0, student_model_1.toStudentResponse)(response);
        });
    }
    static loginStudent(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // validation
            const validatedRequest = Validation_1.Validation.validate(student_validation_1.StudentValidation.LOGIN, request);
            const student = yield database_1.prismaClient.student.findFirst({
                where: {
                    username: validatedRequest.username
                }
            });
            if (!student) {
                throw new response_error_1.ResponseError(401, "Email or Password incorret");
            }
            // check if ppassword is valid
            const passwordMatch = yield bcrypt_1.default.compare(validatedRequest.password, student.password);
            if (!passwordMatch) {
                throw new response_error_1.ResponseError(401, "Email or Password incorrect");
            }
            ;
            // update student token
            const token = (0, uuid_1.v4)();
            const response = yield database_1.prismaClient.student.update({
                where: {
                    username: validatedRequest.username
                },
                data: {
                    token: token
                }
            });
            return (0, student_model_1.toStudentResponse)(response);
        });
    }
    static getCurrentStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, student_model_1.toStudentResponse)(student);
        });
    }
    static getStudentLeaderBoard(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            // get the leaderboard from database
            const skip = (page - 1) * limit;
            const pagination = {
                size: limit,
                total_page: Math.ceil(Number(yield database_1.prismaClient.student.count({})) / limit),
                current_page: page
            };
            const student = yield database_1.prismaClient.student.findMany({
                orderBy: {
                    points: "desc"
                },
                skip: skip,
                take: limit
            });
            if (!student) {
                throw new response_error_1.ResponseError(404, "Not Found");
            }
            ;
            const data = student.map((({ username, points }) => ({ username, points })));
            return (0, student_model_1.toStudentLeaderboardResponse)(data, pagination);
        });
    }
    static updateStudent(request, student) {
        return __awaiter(this, void 0, void 0, function* () {
            // validation
            const validatedRequest = Validation_1.Validation.validate(student_validation_1.StudentValidation.UPDATE, request);
            if (validatedRequest.username) {
                yield database_1.prismaClient.student.update({
                    where: {
                        id: student.id
                    },
                    data: {
                        username: validatedRequest.username
                    }
                });
            }
            if (validatedRequest.avatar) {
                yield database_1.prismaClient.student.update({
                    where: {
                        id: student.id
                    },
                    data: {
                        avatar: validatedRequest.avatar
                    }
                });
            }
            const response = {
                id: student.id,
                message: "Updated",
                avatar: validatedRequest.avatar
            };
            return response;
        });
    }
    static logoutCurrentStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.student.update({
                where: {
                    username: student.username
                },
                data: {
                    token: null
                }
            });
        });
    }
}
exports.StudentService = StudentService;
