import supertest from "supertest";
import { app } from '../src/application/web';
import { StudentTest } from "./test-util";

describe('POST  /api/student/', () => {

    afterEach(async () => {
        StudentTest.delete();
    })

    it('should create a new student', async () => {


        const response = await supertest(app)
            .post('/api/stud/register')
            .send({
                username: "student.test",
                email: "student.test@example.com",
                password: "rahasia123"
            });

        expect(response.status).toBe(201);
        expect(response.body.username).toBe("student.test")

    });

    it('should not create a new student', async () => {

        const response = await supertest(app)
            .post('/api/stud/register')
            .send({
                username: "stud",
                email: "stud",
                password: "rah"
            });

        expect(response.error).toBeDefined()
    });
})

describe('POST  /api/stud/login', () => {

    beforeEach(async () => {
        await StudentTest.createDummy();
    })

    afterEach(async () => {
        await StudentTest.delete();
    })

    it('should login new student', async () => {

        const response = await supertest(app)
           .post('/api/stud/login')
           .send({
                username: "student-test-username",
                password: "testpassword123"
            });
        
        expect(response.status).toBe(200);
        expect(response.body.username).toBe("student-test-username")
        expect(response.body.token).toBeDefined()
    })

    it('should not login a new student', async () => {

        const response = await supertest(app)
           .post('/api/stud/login')
           .send({
                username: "username salah",
                password: "password salah"
            });
        
        expect(response.error).toBeDefined();
    });

})

describe('GET  /api/student/current', () => {

    beforeEach(async () => {
        await StudentTest.createDummy();
    })

    afterEach(async () => {
        await StudentTest.delete();
    })

    it('should return the current student logged in', async () => {

        const response = await supertest(app)
           .post('/api/student/current')
           .send({
                username: "student-test-username",
                password: "testpassword123"
            });

    })

})