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
exports.WorksService = void 0;
const database_1 = require("../application/database");
const works_model_1 = require("../model/works-model");
const uuid_1 = require("uuid");
const create_works_update_1 = require("../helpers/create-works-update");
const get_soal_works_1 = require("../helpers/get-soal-works");
class WorksService {
    static getRemainingLimit(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = { remaining_limit: student.quota, membership: student.membership };
            return response;
        });
    }
    static getWorks(student, category, page, remaining_limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagination = {
                size: 1,
                total_page: remaining_limit,
                current_page: page
            };
            if (category === "none") {
                const soals = yield (0, get_soal_works_1.getSoalWithExcludedIds)(student.username);
                console.log("none");
                return { pagination: pagination, data: [soals] };
            }
            else {
                console.log("by category");
                const soals = yield (0, get_soal_works_1.getSoalWithExcludedIdsbyCat)(student.username, category);
                return { pagination: pagination, data: [soals] };
            }
        });
    }
    static createWorks(request, student, soal) {
        return __awaiter(this, void 0, void 0, function* () {
            // get currentSoal
            const currentSoal = yield database_1.prismaClient.soal.findFirst({
                where: {
                    id: soal
                }
            });
            const currentAnswer = currentSoal === null || currentSoal === void 0 ? void 0 : currentSoal.answer;
            // set result
            let result;
            if (request.answer === currentAnswer) {
                result = true;
            }
            else {
                result = false;
            }
            // prepare
            const works_uuid = String((0, uuid_1.v4)());
            // insert into database
            const works = yield database_1.prismaClient.work.create({
                data: Object.assign(Object.assign({ id: works_uuid }, request), { username: student.username, result: result, soal_id: soal })
            });
            yield database_1.prismaClient.student.update({
                where: {
                    id: student.id
                },
                data: {
                    n_soal: student.n_soal + 1,
                    points: student.points + 10,
                    quota: student.quota - 1
                }
            });
            const current_soal = yield database_1.prismaClient.soal.findUnique({
                where: {
                    id: soal
                }
            });
            (0, create_works_update_1.updateStudentNSoal)(student.id, current_soal === null || current_soal === void 0 ? void 0 : current_soal.category);
            return (0, works_model_1.toWorkResponse)(works);
        });
    }
    static setTodayWorks(student) {
        return __awaiter(this, void 0, void 0, function* () {
            // get Todays Works
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            // Set the time to the start of the next day
            tomorrow.setDate(tomorrow.getDate() + 1);
            const works = yield database_1.prismaClient.work.findMany({
                where: {
                    username: student.username,
                    created_at: {
                        gte: today, // Greater than or equal to the start of today
                        lt: tomorrow, // Less than the start of tomorrow
                    },
                },
                orderBy: {
                    created_at: "asc"
                }
            });
            const countTrue = works.filter(work => work.result === true).length;
            // prepare data to insert into result
            const data = {
                id: String((0, uuid_1.v4)()),
                username: student.username,
                today_works: Number(works.length),
                number_of_true: countTrue,
                number_of_false: works.length - countTrue,
            };
            // insert into database
            const response = yield database_1.prismaClient.result.create({
                data: data
            });
            return (response);
        });
    }
    static getTodayWorks(student) {
        return __awaiter(this, void 0, void 0, function* () {
            // get Todays Works
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            // Set the time to the start of the next day
            tomorrow.setDate(tomorrow.getDate() + 1);
            const works = yield database_1.prismaClient.work.findMany({
                where: {
                    username: student.username,
                    created_at: {
                        gte: today, // Greater than or equal to the start of today
                        lt: tomorrow, // Less than the start of tomorrow
                    },
                },
                orderBy: {
                    created_at: "asc"
                }
            });
            const countTrue = works.filter(work => work.result === true).length;
            // prepare data to insert into result
            const data = {
                id: String((0, uuid_1.v4)()),
                username: student.username,
                today_works: Number(works.length),
                number_of_true: countTrue,
                number_of_false: works.length - countTrue,
                created_at: String(Date.now())
            };
            const worksData = yield database_1.prismaClient.work.findMany({
                where: {
                    username: student.username,
                    created_at: {
                        gte: today, // Greater than or equal to the start of today
                        lt: tomorrow, // Less than the start of tomorrow
                    },
                },
            });
            const soalID = worksData.map(work => work.soal_id);
            const soals = yield database_1.prismaClient.soal.findMany({
                where: {
                    id: {
                        in: soalID,
                    },
                },
            });
            const worksResultsResponse = worksData.map(w => {
                const soal = soals.find(s => s.id === w.soal_id);
                return {
                    soal_id: soal === null || soal === void 0 ? void 0 : soal.id,
                    label: soal === null || soal === void 0 ? void 0 : soal.label,
                    category: soal === null || soal === void 0 ? void 0 : soal.category,
                    text: soal === null || soal === void 0 ? void 0 : soal.text,
                    question: soal === null || soal === void 0 ? void 0 : soal.question,
                    type: soal === null || soal === void 0 ? void 0 : soal.type,
                    correct_answer: soal === null || soal === void 0 ? void 0 : soal.answer,
                    your_answer: w.answer,
                    text2: soal === null || soal === void 0 ? void 0 : soal.text2,
                    text3: soal === null || soal === void 0 ? void 0 : soal.text3,
                    text4: soal === null || soal === void 0 ? void 0 : soal.text4,
                    text5: soal === null || soal === void 0 ? void 0 : soal.text5,
                    image1: soal === null || soal === void 0 ? void 0 : soal.image1,
                    image2: soal === null || soal === void 0 ? void 0 : soal.image2,
                    image3: soal === null || soal === void 0 ? void 0 : soal.image3,
                    image4: soal === null || soal === void 0 ? void 0 : soal.image4,
                    image5: soal === null || soal === void 0 ? void 0 : soal.image5,
                    option_image1: soal === null || soal === void 0 ? void 0 : soal.option_image1,
                    option_image2: soal === null || soal === void 0 ? void 0 : soal.option_image2,
                    option_image3: soal === null || soal === void 0 ? void 0 : soal.option_image3,
                    option_image4: soal === null || soal === void 0 ? void 0 : soal.option_image4,
                    option_image5: soal === null || soal === void 0 ? void 0 : soal.option_image5,
                    option_point1: soal === null || soal === void 0 ? void 0 : soal.option_point1,
                    option_point2: soal === null || soal === void 0 ? void 0 : soal.option_point2,
                    option_point3: soal === null || soal === void 0 ? void 0 : soal.option_point3,
                    option_point4: soal === null || soal === void 0 ? void 0 : soal.option_point4,
                    option_point5: soal === null || soal === void 0 ? void 0 : soal.option_point5,
                    option1: soal === null || soal === void 0 ? void 0 : soal.option1,
                    option2: soal === null || soal === void 0 ? void 0 : soal.option2,
                    option3: soal === null || soal === void 0 ? void 0 : soal.option3,
                    option4: soal === null || soal === void 0 ? void 0 : soal.option4,
                    option5: soal === null || soal === void 0 ? void 0 : soal.option5,
                    explanation: soal === null || soal === void 0 ? void 0 : soal.explanation,
                    created_at: soal === null || soal === void 0 ? void 0 : soal.created_at,
                    created_by: soal === null || soal === void 0 ? void 0 : soal.created_by
                };
            });
            const response = Object.assign(Object.assign({}, data), { works: worksResultsResponse });
            return (0, works_model_1.toWorksResultsResponse)(response);
        });
    }
}
exports.WorksService = WorksService;
