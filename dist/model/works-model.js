"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toWorksResultsResponse = toWorksResultsResponse;
exports.toWorkResponse = toWorkResponse;
function toWorksResultsResponse(result) {
    return {
        id: result.id,
        username: result.username,
        today_works: result.today_works,
        created_at: result.created_at,
        number_of_true: result.number_of_true,
        number_of_false: result.number_of_false,
        works: result.works
    };
}
function toWorkResponse(works) {
    return {
        id: works.id,
        username: works.username,
        soal: works.soal_id,
        answer: works.answer,
        result: works.result,
        created_at: works.created_at,
    };
}
