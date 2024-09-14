import { NextFunction, Request, Response } from "express";
import { StudentReq } from "../types/student-request";
import { OrderRequest } from "../model/order-model";
import { OrderService } from "../service/order-service";

export class OrderController {

    static async createOrder(req: StudentReq, res: Response, next: NextFunction) {


        try {
            const request : OrderRequest = await req.body as OrderRequest;
            const response = await OrderService.createOrder(request, req.student!);
    
            res.status(201);
            res.json(response); 
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async cancelOrder(req: StudentReq, res: Response, next: NextFunction) {

        try {

            const orderID: string = req.query.order_id as string;

            const response = await OrderService.cancelOrder(orderID, req.student!);

            res.status(200);
            res.json(response)

        } catch (err) {
            next(err)
        }
    }

    static async getOrderHistory(req: StudentReq, res: Response, next: NextFunction) {

        try {

            const page: number = parseInt(req.params.page) | 1
            const limit: number = parseInt(req.params.limit) | 10

            const response = await OrderService.getOrderByStudentID(req.student!, page, limit )
            res.status(200);
            res.json(response)

        } catch (err) {

            console.log(err)
            next(err);
        }
    }

    static async premiumOrder(req: StudentReq, res: Response, next: NextFunction) {

        try {
            const response = await OrderService.premiumOrder(req.student!)
            res.status(200);
            res.json(response);
        } catch (err) {
            console.log(err)
            next(err);
        }

    }
}