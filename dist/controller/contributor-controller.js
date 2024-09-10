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
exports.ContributorController = void 0;
const contributor_service_1 = require("../service/contributor-service");
class ContributorController {
    static createContributor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // define request and response
                const request = yield req.body;
                const response = yield contributor_service_1.ContributoService.createContributor(request);
                // defined response status and json response
                res.status(201);
                res.json(response);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static loginContributor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield req.body;
                const response = yield contributor_service_1.ContributoService.loginContributor(request);
                const token = response.token;
                res.cookie('X-API-TOKEN', token, {
                    httpOnly: false,
                    maxAge: 24 * 60 * 60 * 1000, // Cookie expiry time (e.g., 1 day in milliseconds)
                });
                res.status(201);
                res.json(response);
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
    static getSoalCreated(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = Number(req.query.limit);
                const page = Number(req.query.page);
                const response = yield contributor_service_1.ContributoService.getSoalCreated(page, limit, req.contributor);
                res.status(200);
                res.json(response);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getContributorLeaderboard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // define request and response
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const response = yield contributor_service_1.ContributoService.getLeaderboard(page, limit);
                res.status(200);
                res.json(response);
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
    static currentContributor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield contributor_service_1.ContributoService.getCurrentContributor(req.contributor);
                res.status(200);
                res.json(response);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static logoutContributor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield contributor_service_1.ContributoService.logoutCurrentContributor(req.contributor);
                res.status(200);
                res.json({ message: "OK" });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.ContributorController = ContributorController;
