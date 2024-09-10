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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributoService = void 0;
const contributor_model_1 = require("../model/contributor-model");
const database_1 = require("../application/database");
const Validation_1 = require("../validation/Validation");
const contributor_validation_1 = require("../validation/contributor-validation");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_error_1 = require("../error/response-error");
class ContributoService {
    static createContributor(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // validation
            const validatedRequest = Validation_1.Validation.validate(contributor_validation_1.ContributorValidation.CREATE, request);
            if (!validatedRequest) {
                throw new Error('Invalid request');
            }
            ;
            // check if email already exists
            const numberOfEmail = yield database_1.prismaClient.contributor.count({
                where: {
                    email: validatedRequest.email
                }
            });
            if (numberOfEmail != 0) {
                throw new Error('Email already exists');
            }
            ;
            // hash password
            const hashedPassword = yield bcrypt_1.default.hash(validatedRequest.password, 10);
            // set hashedPassword into validatedPassword
            validatedRequest.password = hashedPassword;
            // create uuid and datetime now
            const contributorUUID = String((0, uuid_1.v4)());
            // prepare data for database
            const data = Object.assign(Object.assign({}, validatedRequest), { id: contributorUUID });
            // create contributor
            const response = yield database_1.prismaClient.contributor.create({
                data: data
            });
            // return response
            return response;
        });
    }
    static loginContributor(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // validation
            const validatedRequest = Validation_1.Validation.validate(contributor_validation_1.ContributorValidation.LOGIN, request);
            let contributor = yield database_1.prismaClient.contributor.findFirst({
                where: {
                    username: validatedRequest.username
                }
            });
            if (!contributor) {
                throw new Error('Username or password is incorrect');
            }
            // check if ppassword is valid
            const passwordMatch = yield bcrypt_1.default.compare(validatedRequest.password, contributor.password);
            if (!passwordMatch) {
                throw new Error('Username or password is incorrect');
            }
            ;
            // set token
            const token = String((0, uuid_1.v4)());
            contributor = yield database_1.prismaClient.contributor.update({
                where: {
                    username: validatedRequest.username
                },
                data: {
                    token: token
                }
            });
            // define response
            const response = (0, contributor_model_1.toContributorResponse)(contributor);
            return response;
        });
    }
    static getCurrentContributor(contributor) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, contributor_model_1.toContributorResponse)(contributor);
        });
    }
    static getSoalCreated(page, limit, contributor) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const pagination = {
                size: limit,
                total_page: Math.ceil(Number(yield database_1.prismaClient.soal.count({ where: { created_by: contributor.username } })) / limit),
                current_page: page
            };
            const soal = yield database_1.prismaClient.soal.findMany({
                where: {
                    created_by: contributor.username
                },
                orderBy: {
                    created_at: "desc"
                },
                skip: skip,
                take: limit
            });
            if (!soal) {
                throw new response_error_1.ResponseError(404, "Not Found");
            }
            ;
            const data = soal.map((({ created_at, id, text, type }) => ({ created_at, id, text, type })));
            return (0, contributor_model_1.toMinimizedSoalCreatedResponse)(data, pagination);
        });
    }
    static getLeaderboard(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const pagination = {
                size: limit,
                total_page: Math.ceil(Number(yield database_1.prismaClient.contributor.count()) / limit),
                current_page: page
            };
            const contributors = yield database_1.prismaClient.contributor.findMany({
                orderBy: {
                    contribution_points: "desc"
                },
                skip: skip,
                take: limit
            });
            if (!contributors) {
                throw new response_error_1.ResponseError(404, "Not Found");
            }
            ;
            const data = contributors.map((({ username, contribution_points, n_soal }) => ({ username, contribution_points, n_soal })));
            return (0, contributor_model_1.toContributorLeaderboard)(data, pagination);
        });
    }
    static logoutCurrentContributor(contributor) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.contributor.update({
                where: {
                    username: contributor.username
                },
                data: {
                    token: null
                }
            });
        });
    }
}
exports.ContributoService = ContributoService;
