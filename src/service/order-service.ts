import { Student } from "@prisma/client";
import { prismaClient } from "../application/database";
import { OrderListPagination, OrderRequest, OrderResponse, toOrderResonse, toOrderResponsePagination } from "../model/order-model";
import { Validation } from "../validation/Validation";
import { OrderValidation } from "../validation/order-validation";
import { v4 as uuid } from "uuid";
import { Paging } from "../model/pages";

export class OrderService {

    static async createOrder(request: OrderRequest, student: Student) : Promise<OrderResponse> {

        // validate Order
        const validatedRequest = Validation.validate(OrderValidation.CREATE, request);

        const id = uuid();
        const order_date = String(Date.now());

        // calculate sub_total
        const sub_total = validatedRequest.qty*2000

        const data = {
            id: id,
            ...validatedRequest,
            student_id: student.id,
            sub_total: sub_total,
            order_date: order_date,
        }

        // insert into database
        const response = await prismaClient.order.create({
            data: data
        })

        // return response
        return toOrderResonse(response);

    }

    static async premiumOrder(student: Student) : Promise<{message: string, status_updated: string}> {

        await prismaClient.student.update({
            where: {
                id: student.id
            },
            data: {
                premium_request : "Menunggu Pembayaran"
            }
        })

        return {
            message: "Success",
            status_updated: "Menunggu Pembayaran"
        }
    }

    static async cancelOrder(orderID: string, student: Student) {

        // update order status to cancelled
        const response = await prismaClient.order.update({
            where: {
                id: orderID,
                student_id: student.id
            },
            data: {
                status: "Cancelled"
            }
        })

        return {message: `Cancelled: ${response.id}`}
    }


    // administrator scope
    static async getOrderByStudentID(student: Student, page: number, limit: number) : Promise<OrderListPagination> {

        const skip = (page - 1)*limit;
        const pagination: Paging = {

            size: limit,
            total_page: Math.ceil(Number(await prismaClient.order.count({
                where: {
                    student_id: student.id
                }
            }) / limit)),
            current_page: page
        };

        const order = await prismaClient.order.findMany({

            where: {
                student_id : student.id
            },
            orderBy: {
                order_date: "desc"
            },
            skip: skip,
            take: limit
        })

        if(!order) {
            throw new Error("Not Found")
        }

        return toOrderResponsePagination(order, pagination)
    }
}