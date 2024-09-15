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
exports.getSoalWithExcludedIdsbyCat = getSoalWithExcludedIdsbyCat;
exports.getSoalWithExcludedIds = getSoalWithExcludedIds;
const database_1 = require("../application/database");
const fisher_yates_shuffle_array_1 = require("./fisher-yates-shuffle-array");
function getSoalWithExcludedIdsbyCat(username, category) {
    return __awaiter(this, void 0, void 0, function* () {
        const works = yield database_1.prismaClient.work.findMany({
            where: {
                username: username,
            },
            select: {
                soal_id: true,
            },
        });
        const ids = works.map(id => id.soal_id);
        const soals = yield database_1.prismaClient.soal.findMany({
            where: {
                id: { notIn: ids },
                category: category
            },
            select: {
                id: true,
                text: true,
                category: true,
                type: true,
                label: true,
                question: true,
                option1: true,
                option2: true,
                option3: true,
                option4: true,
                option5: true,
            },
        });
        const shuffled = (0, fisher_yates_shuffle_array_1.shuffleArray)(soals);
        return shuffled[0];
    });
}
function getSoalWithExcludedIds(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const works = yield database_1.prismaClient.work.findMany({
            where: {
                username: username,
            },
            select: {
                soal_id: true,
            },
        });
        const ids = works.map(id => id.soal_id);
        const soals = yield database_1.prismaClient.soal.findMany({
            where: {
                id: { notIn: ids },
            },
            select: {
                id: true,
                text: true,
                category: true,
                type: true,
                label: true,
                question: true,
                option1: true,
                option2: true,
                option3: true,
                option4: true,
                option5: true,
            },
        });
        const shuffled = (0, fisher_yates_shuffle_array_1.shuffleArray)(soals);
        return shuffled[0];
    });
}
