import supertest from "supertest"
import { app } from "../src/application/web"
import { ContributorTest, SoalTIUKataTest, StudentTest, WorksTest } from "./test-util"

describe("GET  /api/student/soal/cpns/tiu/kata", () => {

    beforeEach(async () => {
       await StudentTest.createDummy();
       await ContributorTest.createDummy();

       let i = 0;
       for(i; i<11; i++){
        await SoalTIUKataTest.create(i);
       }
    })

    afterEach(async () => {
        await SoalTIUKataTest.delete();
        await StudentTest.delete();
        await ContributorTest.delete();
    })


    it("Should get random soal", async () => {

        const response = await supertest(app)
           .get("/api/student/soal/cpns/tiu/kata")
           .set("X-API-TOKEN-STUDENT", "token-siswa-benar")
           .query({
                limit: 3,
            })
        
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(3);
    })
})

describe("POST  /api/student/works/?soal=?&student=?", () => {

    beforeEach(async () => {
        await ContributorTest.createDummy()
        await SoalTIUKataTest.create(1);
        await StudentTest.createDummy();
    })

    afterEach(async () => {
        await WorksTest.delete();
        await StudentTest.delete();
        await SoalTIUKataTest.delete();
        await ContributorTest.delete();
    })

    it("should works a soal with result true" , async () => {

        const response = await supertest(app)
           .post("/api/student/works")
           .set("X-API-TOKEN-STUDENT", "token-siswa-benar")
           .query({
                soal:"123abcd1",
                student: "student-test-id"
           })
           .send({
                answer: "D"
           })
        
        expect(response.status).toBe(201)
        expect(response.body.result).toBe(true)

    })

    it("should works a soal with result false" , async () => {

        const response = await supertest(app)
           .post("/api/student/works")
           .set("X-API-TOKEN-STUDENT", "token-siswa-benar")
           .query({
                soal:"123abcd1",
                student: "student-test-id"
           })
           .send({
                answer: "E"
           })
        
        expect(response.status).toBe(201)
        expect(response.body.result).toBe(false)
    })
})