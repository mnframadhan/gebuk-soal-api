import { NextFunction, Request, Response } from "express";
import { AdministratorRequest, AdministratorResponse } from "../model/administrator-model";
import { AdministratorService } from "../service/administrator-service";
import { AdminReq } from "../types/admin-request";

export class AdministratorController {
    

    static async loginAdmin(req: Request, res: Response, next: NextFunction) {
        const request : AdministratorRequest = await req.body as AdministratorRequest;

        try {
            const response : AdministratorResponse = await AdministratorService.loginAdmin(request)

            const token : string = response.token as string;
            res.cookie('X-API-TOKEN-ADMIN', token, {
                httpOnly: false, 
                maxAge: 24 * 60 * 60 * 1000, // Cookie expiry time (e.g., 1 day in milliseconds)
              });

            res.status(201);
            res.json(response);

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getAllOrders(req: Request, res: Response, next: NextFunction) {

        try {

            const page = parseInt(req.query.page as string) || 1;
            const limit =  parseInt(req.query.limit as string) || 10;
            const response = await AdministratorService.getAllOrders(page, limit);

            res.status(200);
            res.json(response);


        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getAllStudents(req: Request, res: Response, next: NextFunction) {

        try {

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const response = await AdministratorService.getAllStudents(page, limit);
            
            res.status(200);
            res.json(response);

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async updateStudentLimit(req: Request, res: Response, next: NextFunction) {

        try {
            const student_id : string = req.query.student_id as string;
            const order_id : string = req.query.order_id as string;
            const request: {limit: number} = req.body as {limit: number}
            const response = await AdministratorService.updateStudentLimit(request, student_id, order_id)

            res.status(200);
            res.json(response);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async updatePremiumStudent(req: Request, res: Response, next: NextFunction) {

        try {
            const student_id : string = req.query.student_id as string;
            const response = await AdministratorService.updatePremiumStudent(student_id);

            res.status(200);
            res.json(response);

        } catch (error) {
            console.log(error);
            next(error);

        }

    }

    static async returnLimit(req: Request, res: Response, next: NextFunction) {

        try {
            const student_id : string = req.query.student_id as string;
            const order_id : string = req.query.order_id as string;
            const request: {limit: number} = req.body as {limit: number}
            const response = await AdministratorService.returnLimit(request, student_id, order_id)

            res.status(200);
            res.json(response);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }


    static async logoutAdmin (req: AdminReq, res: Response, next: NextFunction) {

        try {
            
            await AdministratorService.logoutCurrentAdmin(req.admin!)
            res.status(200);
            res.json({message: "OK"})
        } catch (err) {
            next(err)
        }
    }
}






