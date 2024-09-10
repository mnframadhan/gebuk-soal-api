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
exports.SoalTIUKataService = void 0;
const database_1 = require("../../../application/database");
const tipe_soal_singkat_model_1 = require("../../../model/tipe-soal/tipe-soal-singkat/tipe-soal-singkat-model");
const soal_tiu_validation_1 = require("../../../validation/tipe-soal/tipe-soal-singkat/soal-tiu-validation");
const Validation_1 = require("../../../validation/Validation");
const uuid_1 = require("uuid");
const get_random_integer_1 = require("../../../helpers/get-random-integer");
class SoalTIUKataService {
    static createSoalTIUKata(request, contributor) {
        return __awaiter(this, void 0, void 0, function* () {
            // validation
            const validatedRequest = Validation_1.Validation.validate(soal_tiu_validation_1.SoalTIUValidation.CREATE, request);
            const id = String((0, uuid_1.v4)());
            const created_at = String(Date.now());
            // prepare insert data
            const data = Object.assign(Object.assign({ created_at: created_at }, validatedRequest), { created_by: contributor.username, id: id });
            // insert into database
            const soal = yield database_1.prismaClient.soalTIUKata.create({
                data: data
            });
            // update number of soal and contribution points
            yield database_1.prismaClient.contributor.update({
                where: {
                    username: contributor.username
                },
                data: {
                    number_of_soal: contributor.number_of_soal + 1,
                    contribution_points: contributor.contribution_points + 10
                }
            });
            return (0, tipe_soal_singkat_model_1.toSoalTIUKataResponse)(soal);
        });
    }
    static getSoalTIUKata(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const random_page = (0, get_random_integer_1.getRandomInt)(Number(yield database_1.prismaClient.soalTIUKata.count()) / limit);
            const skip = (random_page - 1) * limit;
            const pagination = {
                size: limit,
                total_page: Math.ceil(Number(yield database_1.prismaClient.soalTIUKata.count()) / limit),
                current_page: random_page
            };
            const soalTIUKata = yield database_1.prismaClient.soalTIUKata.findMany({
                orderBy: {
                    created_at: "desc"
                },
                skip: skip,
                take: limit
            });
            if (!soalTIUKata) {
                throw new Error('Something Error');
            }
            return (0, tipe_soal_singkat_model_1.toSoalTIUKataResponsePagination)(soalTIUKata, pagination);
        });
    }
}
exports.SoalTIUKataService = SoalTIUKataService;
