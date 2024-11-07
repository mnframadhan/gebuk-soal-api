import cors from "cors";
import express from "express";
import { AdministratorController } from "../controller/administrator-controller";
import { CandidateController } from "../controller/candidate-controller";
import { CompanyController } from "../controller/company-controller";
import { ContributorController } from "../controller/contributor-controller";
import { OrderController } from "../controller/order-controller";
import { PackageBundleController } from "../controller/package-bundle-controller";
import { PackageTestUnitController } from "../controller/package-test-unit-controller";
import { PublicInfoController } from "../controller/public-info-controller";
import { SoalController } from "../controller/soal-controller";
import { StudentController } from "../controller/student-controller";
import { WorksController } from "../controller/works-controller";
import { authAdminMiddleware } from "../middleware/auth-admin-middleware";
import { authCompanyMiddleware } from "../middleware/auth-company-middleware";
import { authMiddleware } from "../middleware/auth-middleware";
import { authStudentMiddleware } from "../middleware/auth-student-middleware";
import { errorMiddleware } from "../middleware/error-middleware";
import { packageBundleMiddleware } from "../middleware/package-bundle-middleware";
import { globalLimiter, limiter, plusLimiter } from "../middleware/request-limiter";
import { upload } from "../middleware/upload-file-middleware";

export const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173", // Specify the allowed origin
        credentials: true, // Allow credentials (cookies, authorization headers)
    })
);
app.use(globalLimiter); // limited maximum only 100 requests per minute

// sayHello

app.get("/", (req, res) => {
    res.status(200);
    res.send("Hello, This is Cipta Talenta API");
});

// PUBLIC API
//public info
app.get("/api/info", PublicInfoController.getPublicInfo);

// contributors
app.post("/api/contrib/register", ContributorController.createContributor);
app.post("/api/contrib/login", ContributorController.loginContributor);
// students
app.post("/api/stud/register", StudentController.createStudent);
app.post("/api/stud/login", StudentController.loginStudent);

// admin
// app.post('/api/admin/register', AdministratorController.createAdmin)
app.post("/api/admin/login", AdministratorController.loginAdmin);

// companies
app.post("/api/comp/register", CompanyController.createCompany);
app.post("/api/comp/login", CompanyController.loginCompany);
app.get("/api/comp/all", CompanyController.getAllCompanies);

// PRIVATE API
// contributor api
app.get("/api/contributor/current", authMiddleware, ContributorController.currentContributor);
app.delete("/api/contributor/current", authMiddleware, ContributorController.logoutContributor);
app.post("/api/contributor/soal", upload.single("image1"), authMiddleware, SoalController.createSoal);
app.get("/api/contributor/current/soal", authMiddleware, ContributorController.getSoalCreated);

// student api
app.get("/api/student/current", authStudentMiddleware, StudentController.currentStudent);
app.delete("/api/student/current", authStudentMiddleware, StudentController.logoutStudent);
app.patch("/api/student/current", authStudentMiddleware, StudentController.updateStudent);
app.patch("/api/student/verification", authStudentMiddleware, StudentController.studentEmailVerification);
app.patch("/api/student/update", authStudentMiddleware, StudentController.updateStudent);
app.patch("/api/student/avatar", authStudentMiddleware, upload.single("avatar"),  StudentController.updateAvatar);

app.get("/api/student/works/limit", authStudentMiddleware, WorksController.getRemainingLimit);
app.post("/api/student/works", authStudentMiddleware, WorksController.createWorks); // query soal (uuid) //
app.get("/api/student/dashboard-data", authStudentMiddleware, WorksController.getDashboardData)

// student api works by membership
app.get("/api/student/works/basic", authStudentMiddleware, limiter, WorksController.getWorks); //  query page, remaining_limit,
app.get("/api/student/works/limit-plus", authStudentMiddleware, plusLimiter, WorksController.getWorks); //  category, query page, remaining_limit,
app.get("/api/student/works/premium", authStudentMiddleware, WorksController.getWorks); //  category, query page, remaining_limit,

// student api works results
app.post("/api/student/results", authStudentMiddleware, WorksController.createTodayResults); // maximum n of request 20 per 15 minutes
app.get("/api/student/results", authStudentMiddleware, WorksController.getTodayResults); // maximum n of request 20 per 15 minutes

// student order
app.post("/api/student/order", authStudentMiddleware, OrderController.createOrder);
app.patch("/api/student/order", authStudentMiddleware, OrderController.cancelOrder);
app.get("/api/student/order", authStudentMiddleware, OrderController.getOrderHistory);
app.patch("/api/student/order/premium", authStudentMiddleware, OrderController.premiumOrder);
app.get("/api/student/order/premium", authStudentMiddleware, OrderController.getPremiumOrderId);
app.delete("/api/student/order/premium", authStudentMiddleware, OrderController.cancelPremiumOrder);

// administrator
app.get("/api/admin/all-students", authAdminMiddleware, AdministratorController.getAllStudents); // query page and limit
app.get("/api/admin/all-students/orders", authAdminMiddleware, AdministratorController.getAllOrders); // query page and limit
app.get("/api/admin/student/premium-request", authAdminMiddleware, AdministratorController.getPremiumOrder )
app.patch("/api/admin/student", authAdminMiddleware, AdministratorController.updateStudentLimit); // query student_id and order_id
app.patch("/api/admin/student/return", authAdminMiddleware, AdministratorController.returnLimit); // query student_id and order_id
app.delete("/api/admin/logout", authAdminMiddleware, AdministratorController.logoutAdmin);
app.patch("/api/admin/student/premium/approve", authAdminMiddleware, AdministratorController.updatePremiumStudent); // query student_id

// company
app.get("/api/company/current", authCompanyMiddleware, CompanyController.getCurrentCompany);
app.patch("/api/company/verification", authCompanyMiddleware, CompanyController.companyEmailVerification);
app.delete("/api/company/current", authCompanyMiddleware, CompanyController.logoutCompany);
app.patch("/api/company/current/banner", authCompanyMiddleware, upload.single("image"), CompanyController.updateProfileBanner);
app.patch("/api/company/orders/standard-package", authCompanyMiddleware, CompanyController.orderStandardPackage);
app.post("/api/company/preferred-skills", authCompanyMiddleware, CompanyController.setPreferredSkills);
app.delete("/api/company/preferred-skills", authCompanyMiddleware, CompanyController.deletePreferredSkills);
app.post("/api/company/touch", authCompanyMiddleware, CompanyController.touchCandidateController); // query candidate_id

// company test-bundle
app.post("/api/company/bundle-test", authCompanyMiddleware, PackageBundleController.createPackageBundle);
app.get("/api/company/bundle-test", authCompanyMiddleware, PackageBundleController.getPackageBundle);
app.patch("/api/company/bundle-test", authCompanyMiddleware, PackageBundleController.updatePackageBundle);
app.get("/api/company/bundle-test/:package_bundle_id", authCompanyMiddleware, PackageBundleController.getPackageBundlebyId); // params package_bundle_id
app.patch("/api/company/bundle-test/token", authCompanyMiddleware, PackageBundleController.generateToken); // query package_bundle_id
app.delete("/api/company/bundle-test/token", authCompanyMiddleware, PackageBundleController.deleteToken);

// company package-test-unit
app.post("/api/company/bundle-test/test-unit", authCompanyMiddleware, PackageTestUnitController.createPackageTestUnit); // query package_bundle_id
app.post("/api/company/bundle-test/test-unit/image", upload.single("text_image"), authCompanyMiddleware, PackageTestUnitController.createPackageTestUnitWithImage); // query package_bundle_id
app.patch("/api/company/bundle-test/test-unit/:package_test_unit_id", authCompanyMiddleware, PackageTestUnitController.updatePackageTestUnit); // params package_test_unit_id
app.delete("/api/company/bundle-test/test-unit", authCompanyMiddleware, PackageTestUnitController.deletePackageTestUnit);
app.get("/api/company/bundle-test/:package_bundle_id/test-unit", authCompanyMiddleware, PackageTestUnitController.getPackageTestUnitByPackageBundleId); // query package_bundle_test_id
app.get("/api/company/bundle-test/works/:package_bundle_id", authCompanyMiddleware, CompanyController.getPackageTestUnitByPackageBundleIdPagination); // query page // query package_bundle_id

// company package-bundle-candidate-result
app.get("/api/company/bundle-result", authCompanyMiddleware, CompanyController.getResultOfPackageBundle);

// candidate (one-to-one relation with students)
app.post("/api/candidate/register", authStudentMiddleware, CandidateController.createCandidate);
app.get("/api/candidate/current", authStudentMiddleware, CandidateController.getCurrentCandidate);
app.get("/api/candidate/token", authStudentMiddleware, CandidateController.checkPackageBundleToken); // query package_bundle_token
app.get("/api/candidate/bundle-test", authStudentMiddleware, packageBundleMiddleware, CandidateController.getPackageBundleById); // params package_bundle_id
app.patch("/api/candidate/verification", authStudentMiddleware, CandidateController.candidateEmailVerification)

// candidate works
app.get("/api/candidate/bundle-test/works", authStudentMiddleware, packageBundleMiddleware, CandidateController.getPackageTestUnitsByPackageBundleIdPagination); // query page
app.post("/api/candidate/bundle-test/test-unit/works", authStudentMiddleware, packageBundleMiddleware, CandidateController.createWorks); // query package_test_unit_id // query package_bundle_id
app.post("/api/candidate/bundle-test/results", authStudentMiddleware, packageBundleMiddleware, CandidateController.createResults); // query package_bundle_id

app.use(errorMiddleware);
