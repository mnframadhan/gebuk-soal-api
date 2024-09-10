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
exports.updateStudentNSoal = void 0;
const database_1 = require("../application/database");
const updateStudentNSoal = (id, soal_type) => __awaiter(void 0, void 0, void 0, function* () {
    switch (soal_type) {
        case "Tes Intelegensi Umum":
            // Case 1: Update student's name
            yield database_1.prismaClient.student.update({
                where: { id: id },
                data: { n_soal_tiu: { increment: 1 } },
            });
            break;
        case "Tes Wawasan Kebangsaan":
            // Case 2: Update student's limit
            yield database_1.prismaClient.student.update({
                where: { id: id },
                data: { n_soal_twk: { increment: 1 } },
            });
            break;
        case "Tes Karakteristik Pribadi":
            // Case 3: Update both name and limit
            yield database_1.prismaClient.student.update({
                where: { id: id },
                data: { n_soal_tkp: { increment: 1 } },
            });
            break;
        default:
            console.log('No matching case found');
    }
});
exports.updateStudentNSoal = updateStudentNSoal;
