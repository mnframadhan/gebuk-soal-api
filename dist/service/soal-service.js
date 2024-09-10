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
exports.SoalService = void 0;
const database_1 = require("../application/database");
const soal_model_1 = require("../model/soal-model");
const soal_validation_1 = require("../validation/soal-validation");
const Validation_1 = require("../validation/Validation");
const uuid_1 = require("uuid");
const get_random_integer_1 = require("../helpers/get-random-integer");
const response_error_1 = require("../error/response-error");
class SoalService {
    static createSoal(request, contributor) {
        return __awaiter(this, void 0, void 0, function* () {
            // validation
            const validatedRequest = Validation_1.Validation.validate(soal_validation_1.SoalValidation.CREATE, request);
            const id = String((0, uuid_1.v4)());
            // prepare insert data
            const data = Object.assign(Object.assign({}, validatedRequest), { created_by: contributor.username, id: id });
            // insert into database
            const soal = yield database_1.prismaClient.soal.create({
                data: data
            });
            // update number of soal and contribution points
            yield database_1.prismaClient.contributor.update({
                where: {
                    username: contributor.username
                },
                data: {
                    n_soal: contributor.n_soal + 1,
                    contribution_points: contributor.contribution_points + 10
                }
            });
            return (0, soal_model_1.toSoalResponse)(soal);
        });
    }
    static getSoal(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const random_page = (0, get_random_integer_1.getRandomInt)(Number(yield database_1.prismaClient.soal.count()) / limit);
            const skip = (random_page - 1) * limit;
            const pagination = {
                size: limit,
                total_page: Math.ceil(Number(yield database_1.prismaClient.soal.count()) / limit),
                current_page: random_page
            };
            const soal = yield database_1.prismaClient.soal.findMany({
                orderBy: {
                    created_at: "desc"
                },
                skip: skip,
                take: limit
            });
            if (!soal) {
                throw new response_error_1.ResponseError(404, 'Not Found');
            }
            return (0, soal_model_1.toSoalResponsePagination)(soal, pagination);
        });
    }
}
exports.SoalService = SoalService;
