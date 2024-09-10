"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const contributor_controller_1 = require("../controller/contributor-controller");
const student_controller_1 = require("../controller/student-controller");
const auth_middleware_1 = require("../middleware/auth-middleware");
const soal_controller_1 = require("../controller/soal-controller");
const auth_student_middleware_1 = require("../middleware/auth-student-middleware");
const works_controller_1 = require("../controller/works-controller");
const cors_1 = __importDefault(require("cors"));
const request_limiter_1 = require("../middleware/request-limiter");
const order_controller_1 = require("../controller/order-controller");
const administrator_controller_1 = require("../controller/administrator-controller");
const auth_admin_middleware_1 = require("../middleware/auth-admin-middleware");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Specify the allowed origin
    credentials: true // Allow credentials (cookies, authorization headers)
}));
exports.app.use(request_limiter_1.globalLimiter); // limited maximum only 100 requests per minute
// PUBLIC API
// contributors
exports.app.post('/api/contrib/register', contributor_controller_1.ContributorController.createContributor);
exports.app.post('/api/contrib/login', contributor_controller_1.ContributorController.loginContributor);
exports.app.get('/api/contrib/leaderboard', contributor_controller_1.ContributorController.getContributorLeaderboard);
// students
exports.app.post('/api/stud/register', student_controller_1.StudentController.createStudent);
exports.app.post('/api/stud/login', student_controller_1.StudentController.loginStudent);
exports.app.get('/api/stud/leaderboard', student_controller_1.StudentController.getStudentLeaderBoard); // query page and limit
// admin
// app.post('/api/admin/register', AdministratorController.createAdmin)
exports.app.post('/api/admin/login', administrator_controller_1.AdministratorController.loginAdmin);
// PRIVATE API
// contributor api
exports.app.get('/api/contributor/current', auth_middleware_1.authMiddleware, contributor_controller_1.ContributorController.currentContributor);
exports.app.delete('/api/contributor/current', auth_middleware_1.authMiddleware, contributor_controller_1.ContributorController.logoutContributor);
exports.app.post('/api/contributor/soal', auth_middleware_1.authMiddleware, soal_controller_1.SoalController.createSoal);
exports.app.get('/api/contributor/current/soal', auth_middleware_1.authMiddleware, contributor_controller_1.ContributorController.getSoalCreated);
// student api
exports.app.get('/api/student/current', auth_student_middleware_1.authStudentMiddleware, student_controller_1.StudentController.currentStudent);
exports.app.delete('/api/student/current', auth_student_middleware_1.authStudentMiddleware, student_controller_1.StudentController.logoutStudent);
exports.app.put('/api/student/current', auth_student_middleware_1.authStudentMiddleware, student_controller_1.StudentController.updateStudent);
exports.app.get('/api/student/soal', auth_student_middleware_1.authStudentMiddleware, soal_controller_1.SoalController.getSoalPagination); // query limit
// student api works
exports.app.get('/api/student/works/limit', auth_student_middleware_1.authStudentMiddleware, works_controller_1.WorksController.getRemainingLimit);
exports.app.post('/api/student/works', auth_student_middleware_1.authStudentMiddleware, works_controller_1.WorksController.createWorks); // query soal (uuid) //
// student api works by membership
exports.app.get('/api/student/works', auth_student_middleware_1.authStudentMiddleware, request_limiter_1.limiter, works_controller_1.WorksController.getSoalForWorks); // query page //
exports.app.get('/api/student/works/limit-plus', auth_student_middleware_1.authStudentMiddleware, request_limiter_1.plusLimiter, works_controller_1.WorksController.getSoalForWorks);
exports.app.get('/api/student/works/premium', auth_student_middleware_1.authStudentMiddleware, works_controller_1.WorksController.getSoalForWorks);
exports.app.get('/api/student/works/limit-');
// student api works results
exports.app.post('/api/student/results', auth_student_middleware_1.authStudentMiddleware, works_controller_1.WorksController.createTodayResults); // maximum n of request 20 per 15 minutes
exports.app.get('/api/student/results', auth_student_middleware_1.authStudentMiddleware, works_controller_1.WorksController.getTodayResults); // maximum n of request 20 per 15 minutes
// student order
exports.app.post('/api/student/order', auth_student_middleware_1.authStudentMiddleware, order_controller_1.OrderController.createOrder);
exports.app.put('/api/student/order', auth_student_middleware_1.authStudentMiddleware, order_controller_1.OrderController.cancelOrder);
exports.app.get('/api/student/order', auth_student_middleware_1.authStudentMiddleware, order_controller_1.OrderController.getOrderHistory);
// administrator
exports.app.get('/api/admin/all-students', auth_admin_middleware_1.authAdminMiddleware, administrator_controller_1.AdministratorController.getAllStudents); // query page and limit
exports.app.get('/api/admin/all-students/orders', auth_admin_middleware_1.authAdminMiddleware, administrator_controller_1.AdministratorController.getAllOrders); // query page and limit
exports.app.put('/api/admin/student', auth_admin_middleware_1.authAdminMiddleware, administrator_controller_1.AdministratorController.updateStudentLimit); // query student_id and order_id
exports.app.put('/api/admin/student/return', auth_admin_middleware_1.authAdminMiddleware, administrator_controller_1.AdministratorController.returnLimit); // query student_id and order_id
exports.app.delete('/api/admin/logout', auth_admin_middleware_1.authAdminMiddleware, administrator_controller_1.AdministratorController.logoutAdmin);
