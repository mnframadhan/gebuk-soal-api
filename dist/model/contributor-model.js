"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toContributorResponse = toContributorResponse;
exports.toMinimizedSoalCreatedResponse = toMinimizedSoalCreatedResponse;
exports.toContributorLeaderboard = toContributorLeaderboard;
function toContributorResponse(contributor) {
    return {
        id: contributor.id,
        username: contributor.username,
        email: contributor.email,
        created_at: contributor.created_at,
        contribution_points: contributor.contribution_points,
        n_soal: contributor.n_soal,
        token: contributor.token || undefined
    };
}
function toMinimizedSoalCreatedResponse(contributor, pagination) {
    return {
        data: contributor,
        pagination: pagination
    };
}
function toContributorLeaderboard(contributor, pagination) {
    return {
        data: contributor,
        pagination: pagination
    };
}
