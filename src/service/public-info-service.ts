import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { SmallContributorResponse } from "../model/contributor-model";
import { LeaderboardStudentData } from "../model/student-model";

export class PublicInfoServices {

    static async countSoal() : Promise<{n_soal: number}> {

        const count = await prismaClient.soal.count({});
        
        return {
            n_soal: count
        }
    }

    static async countStudent() : Promise<{n_student: number}> {
        
        const count = await prismaClient.student.count({});
        return {
            n_student: count
        }
    }

    static async countContributor() : Promise<{n_contributor: number}> {
        
        const count = await prismaClient.contributor.count({});
        return {
            n_contributor: count
        }
    }

    static async countInstitution() : Promise<{n_institution: number}> {
        const count = 0;
        return {
            n_institution: count
        }
    }

    static async countCompany() : Promise<{n_company: number}>{
        const count = 0;
        return {
            n_company: count
        }
    }

    static async getStudentLeaderBoard() : Promise<LeaderboardStudentData[]> {

        const student = await prismaClient.student.findMany({

            orderBy: {
                points: "desc"
            },
            take: 5
        });

        if(!student) {
            throw new ResponseError(404, "Not Found")
        };

        const data = student.map((

            ({username, points}) => ({username, points})
        
        ))
        
        return data

    }

    static async getLeaderboard() : Promise<SmallContributorResponse[]> {

        const contributors = await prismaClient.contributor.findMany({

            orderBy: {
                contribution_points: "desc"
            },
            take: 5
        });

        if (!contributors) {
            throw new ResponseError(404, "Not Found")
        };

        const data = contributors.map((

            ({username, contribution_points, n_soal}) => ({username, contribution_points, n_soal})
        
        ))
        
        return data
    }
}