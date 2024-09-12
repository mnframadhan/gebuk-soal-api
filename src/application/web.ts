import express from 'express';
import { ContributorController } from '../controller/contributor-controller';
import { StudentController } from '../controller/student-controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { SoalController } from '../controller/soal-controller';
import { authStudentMiddleware } from '../middleware/auth-student-middleware';
import { WorksController } from '../controller/works-controller';
import cors from 'cors';
import { globalLimiter, limiter, plusLimiter } from '../middleware/request-limiter';
import { OrderController } from '../controller/order-controller';
import { AdministratorController } from '../controller/administrator-controller';
import { authAdminMiddleware } from '../middleware/auth-admin-middleware';

export const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Specify the allowed origin
  credentials: true                // Allow credentials (cookies, authorization headers)
}));
app.use(globalLimiter)  // limited maximum only 100 requests per minute
  
// PUBLIC API
// contributors
app.post('/api/contrib/register', ContributorController.createContributor)
app.post('/api/contrib/login', ContributorController.loginContributor)
app.get('/api/contrib/leaderboard', ContributorController.getContributorLeaderboard)
// students
app.post('/api/stud/register', StudentController.createStudent )
app.post('/api/stud/login', StudentController.loginStudent)
app.get('/api/stud/leaderboard', StudentController.getStudentLeaderBoard) // query page and limit
// admin
// app.post('/api/admin/register', AdministratorController.createAdmin)
app.post('/api/admin/login', AdministratorController.loginAdmin)


// PRIVATE API
// contributor api
app.get('/api/contributor/current', authMiddleware, ContributorController.currentContributor)
app.delete('/api/contributor/current', authMiddleware, ContributorController.logoutContributor)
app.post('/api/contributor/soal', authMiddleware, SoalController.createSoal)
app.get('/api/contributor/current/soal', authMiddleware, ContributorController.getSoalCreated)


// student api
app.get('/api/student/current', authStudentMiddleware, StudentController.currentStudent)
app.delete('/api/student/current', authStudentMiddleware, StudentController.logoutStudent)
app.put('/api/student/current', authStudentMiddleware, StudentController.updateStudent)
// app.get('/api/student/soal', authStudentMiddleware, SoalController.getSoalPagination) // query limit

// student api works
app.get('/api/student/works/limit', authStudentMiddleware, WorksController.getRemainingLimit)

app.post(
    '/api/student/works',  
    authStudentMiddleware, 
    WorksController.createWorks) // query soal (uuid) //

// student api works by membership
app.get(
    '/api/student/works', 
    authStudentMiddleware, 
    limiter,
    WorksController.getSoalForWorks) //  query page, remaining_limit,
    
app.get(
    '/api/student/works/limit-plus', 
    authStudentMiddleware, 
    plusLimiter, 
    WorksController.getSoalForWorks) //  category, query page, remaining_limit,

app.get(
    '/api/student/works/premium', 
    authStudentMiddleware,
    WorksController.getSoalForWorks) //  category, query page, remaining_limit,

// student api works results
app.post('/api/student/results', authStudentMiddleware, WorksController.createTodayResults) // maximum n of request 20 per 15 minutes
app.get('/api/student/results', authStudentMiddleware, WorksController.getTodayResults)  // maximum n of request 20 per 15 minutes

// student order
app.post('/api/student/order', authStudentMiddleware, OrderController.createOrder)
app.put('/api/student/order', authStudentMiddleware, OrderController.cancelOrder)
app.get('/api/student/order', authStudentMiddleware, OrderController.getOrderHistory)

// administrator
app.get('/api/admin/all-students', authAdminMiddleware, AdministratorController.getAllStudents) // query page and limit
app.get('/api/admin/all-students/orders', authAdminMiddleware, AdministratorController.getAllOrders) // query page and limit
app.put('/api/admin/student', authAdminMiddleware, AdministratorController.updateStudentLimit) // query student_id and order_id
app.put('/api/admin/student/return', authAdminMiddleware, AdministratorController.returnLimit) // query student_id and order_id
app.delete('/api/admin/logout', authAdminMiddleware, AdministratorController.logoutAdmin)