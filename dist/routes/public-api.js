"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const contributor_controller_1 = require("../controller/contributor-controller");
exports.publicRouter = express_1.default.Router();
exports.publicRouter.get('/', (req, res) => {
    res.json({ message: 'Welcome to Gebuk-Soal!' });
});
exports.publicRouter.post('/api/contributor', contributor_controller_1.ContributorController.createContributor);
exports.publicRouter.post('/api/contributor/login', contributor_controller_1.ContributorController.loginContributor);
