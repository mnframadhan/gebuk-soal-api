"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toStudentLeaderboardResponse = toStudentLeaderboardResponse;
exports.toStudentResponse = toStudentResponse;
function toStudentLeaderboardResponse(data, pagination) {
    return {
        data: data,
        pagination: pagination
    };
}
function toStudentResponse(student) {
    return {
        id: student.id,
        username: student.username,
        email: student.email,
        points: student.points,
        n_soal: student.n_soal,
        n_soal_tiu: student.n_soal_tiu,
        n_soal_twk: student.n_soal_twk,
        n_soal_tkp: student.n_soal_tkp,
        created_at: student.created_at,
        quota: student.quota,
        membership: student.membership,
        token: student.token,
        avatar: student.avatar
    };
}
