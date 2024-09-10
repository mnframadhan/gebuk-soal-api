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
exports.StudentController = void 0;
const student_service_1 = require("../service/student-service");
class StudentController {
    static createStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield req.body;
                const response = yield student_service_1.StudentService.createStudent(request);
                res.status(201);
                res.json(response);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static loginStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield req.body;
                const response = yield student_service_1.StudentService.loginStudent(request);
                const token = response.token;
                res.cookie('X-API-TOKEN-STUDENT', token, {
                    httpOnly: false,
                    maxAge: 24 * 60 * 60 * 1000, // Cookie expiry time (e.g., 1 day in milliseconds)
                });
                res.status(200);
                res.json(response);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static currentStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield student_service_1.StudentService.getCurrentStudent(req.student);
                res.status(200);
                res.json(response);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static updateStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield student_service_1.StudentService.updateStudent(request, req.student);
                res.status(200);
                res.json(response);
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
    static getStudentLeaderBoard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.params.page) | 1;
                const limit = parseInt(req.params.limit) | 5;
                const response = yield student_service_1.StudentService.getStudentLeaderBoard(page, limit);
                res.status(200);
                res.json(response);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static logoutStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield student_service_1.StudentService.logoutCurrentStudent(req.student);
                res.status(200);
                res.json({ message: "OK" });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.StudentController = StudentController;
