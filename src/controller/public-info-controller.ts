import { NextFunction, Request, Response } from "express";
import { PublicInfoServices } from "../service/public-info-service";

export class PublicInfoController {

    static async getPublicInfo(req: Request, res: Response, next: NextFunction){

        try {
            const n_soal = await PublicInfoServices.countSoal();
            const n_student = await PublicInfoServices.countStudent();
            const n_contributor = await PublicInfoServices.countContributor();
            const n_institution = await PublicInfoServices.countInstitution();
            const n_company = await PublicInfoServices.countCompany();
            const student_leaderboard = await PublicInfoServices.getStudentLeaderBoard();
            const contributor_leaderboard = await PublicInfoServices.getLeaderboard();

            const response = {
                n_soal : n_soal.n_soal,
                n_student: n_student.n_student,
                n_contributor: n_contributor.n_contributor,
                n_institution: n_institution.n_institution,
                n_company: n_company.n_company,
                student_leaderboard : student_leaderboard,
                contributor_leaderboard: contributor_leaderboard,
            }

            res.status(200);
            res.json(response)
            
        } catch (err) {
            next(err);
        }



    }

}