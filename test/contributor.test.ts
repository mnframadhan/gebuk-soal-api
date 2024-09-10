import supertest from "supertest";
import { app } from "../src/application/web";
import { ContributorTest, SoalTIUKataTest } from "./test-util";

describe('POST  /api/contrib/register', () => {

    afterEach(async () => {
        await ContributorTest.delete();
    })

    it('should create a new contributor', async () => {
        
        const response = await supertest(app)
            .post('/api/contrib/register')
            .send({

                username: "test-contributor",
                email: "test-contributor@gmail.com",
                password: "rahasia12345",

            });

        expect(response.status).toBe(201);
        expect(response.body.username).toBe("test-contributor");
        expect(response.body.email).toBe("test-contributor@gmail.com");

    });
});

describe('POST  /api/contrib/login', () => {

    beforeEach(async () => {
        await ContributorTest.createDummy();
    });

    afterEach(async () => {
        await ContributorTest.delete();
    })

    it('should login a contributor', async () => {
        
        const response = await supertest(app)
            .post('/api/contrib/login')
            .send({
                username: "contributor-test-username",
                password: "testpassword123",
            })

        expect(response.status).toBe(201);
        expect(response.body.token).toBeDefined();
    });

    it('should not login a contributor', async () => {
        
        const response = await supertest(app)
            .post('/api/contrib/login')
            .send({
                username: "contributor-test-username",
                password: "testpassword123456",
            })

        expect(response.error).toBeDefined();
    });
});

describe('GET  /api/contributor/leaderboard', () => {

    beforeEach(async () => {

        let i = 0;
        for(i; i<12; i++) {
            await ContributorTest.create(i);
        }

        await ContributorTest.createDummy(); // with token = token-benar
    });


    afterEach(async () => {
        await ContributorTest.delete();
    });

    it('should get leaderboard page 1 with length 10', async () => {

        const response = await supertest(app)
            .get('/api/contributor/leaderboard')
            .set("X-API-TOKEN", "token-benar")
            .query({
                page: 1,
                limit: 10
            });
        
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(10);
    });

    it('should get leaderboard page 2 with length 2', async () => {

        const response = await supertest(app)
            .get('/api/contributor/leaderboard')
            .set("X-API-TOKEN", "token-benar")
            .query({
                page: 2,
                limit: 10
            });
        
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(3);
    });


    it('should cannot get leaderboard page 1 with length 10', async () => {

        const response = await supertest(app)
            .get('/api/contributor/leaderboard')
            .set("X-API-TOKEN", "token-salah")
            .query({
                page: 1,
                limit: 10
            });
        
        expect(response.error).toBeDefined();
    });
});

describe('POST  /api/contributor/soal/cpns/tiu/kata', () => {

    beforeEach(async () => {
        await ContributorTest.createDummy();
    });

    afterEach(async () => {
        await SoalTIUKataTest.delete();
        await ContributorTest.delete();
    })

    it('should create soal', async () => {

        const response = await supertest(app)
            .post("/api/contributor/soal/cpns/tiu/kata")
            .set("X-API-TOKEN", "token-benar")
            .send({

                label: `CPNS2024`,
                question: `Mengapa why selalu always tapi but tidak pernah never? xx`,
                option1: "option a",
                option2: "option b",
                option3: "option c",
                option4: "option d",
                option5: "option e",
                answer: "D",
                explanation: "Karena always tidak pernah never",
                created_by: "contributor-test-username"
            })
    
        expect(response.status).toBe(201);
        expect(response.body.label).toBe("CPNS2024");
    });

    it('should not create soal', async () => {

        const response = await supertest(app)
            .post("/api/contributor/soal/cpns/tiu/kata")
            .set("X-API-TOKEN", "token-salah")
            .send({

                label: `CPNS2024`,
                question: `Mengapa why selalu always tapi but tidak pernah never? xx`,
                option1: "option a",
                option2: "option b",
                option3: "option c",
                option4: "option d",
                option5: "option e",
                answer: "D",
                explanation: "Karena always tidak pernah never",
                created_by: "contributor-test-username"
            })
    
        expect(response.error).toBeDefined();
    })


})