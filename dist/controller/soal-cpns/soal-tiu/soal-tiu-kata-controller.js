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
exports.SoalTIUKataController = void 0;
const soal_tiu_kata_service_1 = require("../../../service/soal-cpns/soal-tiu/soal-tiu-kata-service");
class SoalTIUKataController {
    static createSoal(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield req.body;
                const response = yield soal_tiu_kata_service_1.SoalTIUKataService.createSoalTIUKata(request, req.contributor);
                res.status(201);
                res.json(response);
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
    static getSoalPagination(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = req.query.limit;
                const response = yield soal_tiu_kata_service_1.SoalTIUKataService.getSoalTIUKata(Number(limit));
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
exports.SoalTIUKataController = SoalTIUKataController;
