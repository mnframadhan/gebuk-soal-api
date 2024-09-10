"use strict";
// model berlaku untuk soal-soal Analogi, Silogisme, 
// Analitis, dan Deret Angka.
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSoalResponse = toSoalResponse;
exports.toSoalResponsePagination = toSoalResponsePagination;
function toSoalResponse(soal) {
    return {
        id: soal.id,
        category: soal.category,
        type: soal.type,
        label: soal.label,
        text: soal.text,
        text2: soal.text2,
        text3: soal.text3,
        text4: soal.text4,
        text5: soal.text5,
        image1: soal.image1,
        image2: soal.image2,
        image3: soal.image3,
        image4: soal.image4,
        image5: soal.image5,
        option_image1: soal.option_image1,
        option_image2: soal.option_image2,
        option_image3: soal.option_image3,
        option_image4: soal.option_image4,
        option_image5: soal.option_image5,
        option_point1: soal.option_point1,
        option_point2: soal.option_point2,
        option_point3: soal.option_point3,
        option_point4: soal.option_point4,
        option_point5: soal.option_point5,
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
function toSoalResponsePagination(soal, pagination) {
    return {
        data: soal,
        pagination: pagination
    };
}
