import { NextFunction, Request, Response } from "express";
import { StudentService } from "../service/student-service";
import { StudentRequest, StudentResponse, StudentUpdateRequest } from "../model/student-model";
import { StudentReq } from "../types/student-request";

export class StudentController {

    static async createStudent ( req: Request, res: Response, next: NextFunction) {

        try {

            const request : StudentRequest = await req.body as StudentRequest;
            const response = await StudentService.createStudent(request);

            res.status(201);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }

    static async loginStudent( req: Request, res: Response, next: NextFunction) {

        try {

            const request = await req.body;
            const response = await StudentService.loginStudent(request);

            const token : string = response.token as string;
            res.cookie('X-API-TOKEN-STUDENT', token, {
                httpOnly: false, 
                maxAge: 24 * 60 * 60 * 1000, // Cookie expiry time (e.g., 1 day in milliseconds)
              });

            res.status(200);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }

    static async currentStudent (req: StudentReq, res: Response, next: NextFunction) {

        try {

            const response = await StudentService.getCurrentStudent(req.student!)

            res.status(200);
            res.json(response);

        } catch (err) {

            next(err)
        }
    }

    static async updateStudent(req: StudentReq, res: Response, next: NextFunction) {

        try {

            const request : StudentUpdateRequest = req.body as StudentUpdateRequest
            const response = await StudentService.updateStudent(request, req.student!)

            res.status(200);
            res.json(response);
        } catch (err) {
            console.log(err)
            next(err);
        }   
    }

    static async getStudentLeaderBoard(req: StudentReq, res: Response, next: NextFunction) {

        try {

            const page : number = parseInt(req.params.page) | 1;
            const limit : number = parseInt(req.params.limit) | 5;
            const response = await StudentService.getStudentLeaderBoard(page, limit);

            res.status(200);
            res.json(response);
        } catch (err) {
            next(err);
        }

    }

    static async logoutStudent (req: StudentReq, res: Response, next: NextFunction) {

        try {
            
            await StudentService.logoutCurrentStudent(req.student!)
            res.status(200);
            res.json({message: "OK"})
        } catch (err) {
            next(err)
        }
    }
}