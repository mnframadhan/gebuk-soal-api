"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const contributor_controller_1 = require("../controller/contributor-controller");
const auth_middleware_1 = require("../middleware/auth-middleware");
const soal_tiu_kata_controller_1 = require("../controller/soal-cpns/soal-tiu/soal-tiu-kata-controller");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(auth_middleware_1.authMiddleware);
exports.apiRouter.get('/api/contributor', contributor_controller_1.ContributorController.getLeaderboard);
// soal
// soal cpns tiu kata
exports.apiRouter.post('/api/contributor/soal/cpns/tiu/kata', soal_tiu_kata_controller_1.SoalTIUKataController.createSoal);
