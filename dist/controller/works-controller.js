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
exports.WorksController = void 0;
const works_service_1 = require("../service/works-service");
class WorksController {
    static getRemainingLimit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield works_service_1.WorksService.getRemainingLimit(req.student);
                res.status(200);
                res.json(response);
            }
            catch (err) {
                res.status(429);
                res.json({ message: "Reached Limit, Upgrade Now" });
            }
        });
    }
    static createWorks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const soal = req.query.soal;
                const request = req.body;
                const response = yield works_service_1.WorksService.createWorks(request, req.student, soal);
                res.status(201);
                res.json(response);
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
    static getSoalForWorks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = Number(req.query.page);
                const remaining_limit = Number(req.query.remaining_limit);
                const response = yield works_service_1.WorksService.getSoalForWorks(page, remaining_limit);
                res.status(200);
                res.json(response);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static createTodayResults(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield works_service_1.WorksService.setTodayWorks(req.student);
                res.status(201);
                res.json(response);
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
    static getTodayResults(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield works_service_1.WorksService.getTodayWorks(req.student);
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
exports.WorksController = WorksController;
