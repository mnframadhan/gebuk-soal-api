"use strict";
// model berlaku untuk soal-soal Analogi, Silogisme, 
// Analitis, dan Deret Angka.
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSoalTIUKataResponse = toSoalTIUKataResponse;
exports.toSoalTIUKataResponsePagination = toSoalTIUKataResponsePagination;
function toSoalTIUKataResponse(soal) {
    return {
        id: soal.id,
        type: soal.type,
        label: soal.label,
        text: soal.text,
        question: soal.question,
        option1: soal.option1,
        option2: soal.option2,
        option3: soal.option3,
        option4: soal.option4,
        option5: soal.option5,
        answer: soal.answer,
        explanation: soal.explanation,
        created_at: soal.created_at,
        created_by: soal.created_by
    };
}
function toSoalTIUKataResponsePagination(soal, pagination) {
    return {
        data: soal,
        pagination: pagination
    };
}
