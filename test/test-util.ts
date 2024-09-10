import { prismaClient } from '../src/application/database'
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

export class ContributorTest {

    static async createDummy() {

        const created_at = String(Date.now())

        await prismaClient.contributor.create({

            data: {

                id: "contributor-test-id",
                username: "contributor-test-username",
                email: "contributor-test-email@example.com",
                password: await bcrypt.hash("testpassword123", 10),
                created_at: created_at,
                token: "token-benar"
            }
        });
    };

    static async create( n: number) {

        const uuid = v4();
        const created_at = String(Date.now());

        await prismaClient.contributor.create({

            data: {

                id: uuid,
                username: `user${n}.contributor` ,
                email: `user${n}@contributor.com`,
                password: "testpassword",
                created_at: created_at,
            }
        });
    };

    static async delete() {
        await prismaClient.contributor.deleteMany({});
    }
}

export class SoalTIUKataTest {

    static async delete() {
        await prismaClient.soalTIUKata.deleteMany({});
    }

    static async create( n: number) {

        const created_at = String(Date.now());

        await prismaClient.soalTIUKata.create({

            data: {

                id: `123abcd${n}`,
                label: `CPNS202${n}`,
                question: `Mengapa why selalu always tapi but tidak pernah never? ${n}`,
                option1: "option a",
                option2: "option b",
                option3: "option c",
                option4: "option d",
                option5: "option e",
                answer: "D",
                explanation: "Karena always tidak pernah never",
                created_at: created_at,
                created_by: "contributor-test-username"

            }
        });
    };    
}

export class StudentTest {

    static async createDummy() {

        const created_at = String(Date.now())

        await prismaClient.student.create({

            data: {

                id: "student-test-id",
                username: "student-test-username",
                email: "student-test-email@example.com",
                password: await bcrypt.hash("testpassword123", 10),
                created_at: created_at,
                token: "token-siswa-benar"

            }
        })

    }

    static async delete() {

        await prismaClient.student.deleteMany({});

    }
}

export class WorksTest {

    static async delete() {

        await prismaClient.works.deleteMany({});

    }

}