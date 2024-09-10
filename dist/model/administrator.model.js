"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAdministratorResponse = toAdministratorResponse;
exports.toAllStudentPagination = toAllStudentPagination;
function toAdministratorResponse(administrator) {
    return {
        username: administrator.username,
        token: administrator.token
    };
}
function toAllStudentPagination(data, pagination) {
    return {
        pagination: pagination,
        data: data
    };
}
