import { prismaClient } from "../application/database";
import { AdministratorRequest, AdministratorResponse, StudentPagination } from "../model/administrator-model";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { ResponseError } from "../error/response-error";
import { StudentResponse } from "../model/student-model";
import { Paging } from "../model/pages";
import { OrderListPagination } from "../model/order-model";
import { Administrator } from "@prisma/client";

export class AdministratorService {
    static async createAdmin(request: AdministratorRequest): Promise<AdministratorResponse> {
        // prepare data
        const encryptedPassword = await bcrypt.hash(request.password, 10);

        const data = {
            id: uuid(),
            username: request.username,
            password: encryptedPassword,
        };

        // insert into database
        const administrator = await prismaClient.administrator.create({
            data: data,
        });

        const response: AdministratorResponse = {
            username: administrator.username,
        };
        // return response
        return response;
    }

    static async loginAdmin(request: AdministratorRequest): Promise<AdministratorResponse> {
        let administrator = await prismaClient.administrator.findFirst({
            where: {
                username: request.username,
            },
        });

        if (!administrator) {
            throw new ResponseError(401, "Unauthorized");
        }

        const passwordMatch = await bcrypt.compare(request.password, administrator.password);

        if (!passwordMatch) {
            throw new ResponseError(401, "");
        }

        const token = String(uuid());
        administrator = await prismaClient.administrator.update({
            where: {
                username: request.username,
            },
            data: {
                token: token,
            },
        });

        const response: AdministratorResponse = {
            username: administrator.username,
            token: administrator.token,
        };

        return response;
    }

    static async getAllStudents(page: number, limit: number): Promise<StudentPagination<StudentResponse>> {
        const skip = (page - 1) * limit;
        const pagination: Paging = {
            size: limit,
            total_page: Math.ceil(Number(await prismaClient.student.count({})) / limit),
            current_page: page,
        };

        const student = await prismaClient.student.findMany({
            skip: skip,
            take: limit,
            orderBy: {
                created_at: "desc",
            },
        });

        return {
            pagination: pagination,
            data: student,
        };
    }

    static async getAllOrders(page: number, limit: number): Promise<OrderListPagination> {
        const skip = (page - 1) * limit;
        const pagination: Paging = {
            size: limit,
            total_page: Math.ceil(Number(await prismaClient.order.count({})) / limit),
            current_page: page,
        };

        const student = await prismaClient.order.findMany({
            skip: skip,
            take: limit,
            orderBy: {
                order_date: "desc",
            },
        });

        return {
            pagination: pagination,
            data: student,
        };
    }

    static async updateStudentLimit(
        request: { limit: number },
        student_id: string,
        order_id: string
    ): Promise<{ message: string; id: string }> {
        const student = await prismaClient.student.update({
            where: {
                id: student_id,
            },
            data: {
                quota: {
                    increment: request.limit,
                },
                membership: "Plus",
            },
        });

        await prismaClient.order.update({
            where: {
                id: order_id,
                student_id: student_id,
            },
            data: {
                status: "Completed",
            },
        });

        const response = {
            message: "updated",
            id: student.id,
        };

        return response;
    }

    static async returnLimit(
        request: { limit: number },
        student_id: string,
        order_id: string
    ): Promise<{ message: string; id: string }> {
        const student = await prismaClient.student.update({
            where: {
                id: student_id,
            },
            data: {
                quota: {
                    decrement: request.limit,
                },
            },
        });

        await prismaClient.order.update({
            where: {
                id: order_id,
                student_id: student_id,
            },
            data: {
                status: "Returned",
            },
        });

        const response = {
            message: "Returned",
            id: student.id,
        };

        return response;
    }

    static async getPremiumOrder(): Promise<any> {
        const premiumRequest = await prismaClient.student.findMany({
            where: {
                premium_request: "Menunggu Pembayaran",
            },
            select: {
                id: true,
                premium_order_id: true,
                premium_request: true,
            },
        });
        return { data: premiumRequest };
    }

    static async updatePremiumStudent(student_id: string): Promise<void> {
        const date = String(Date.now());
        await prismaClient.student.update({
            where: {
                id: student_id,
            },
            data: {
                membership: "Premium",
                premium_at: date,
                premium_request: "Completed",
				quota: null
            },
        });
    }

    static async getAllCompanies(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const pagination: Paging = {
            size: limit,
            total_page: Math.ceil(Number(await prismaClient.company.count({})) / limit),
            current_page: page,
        };

        const student = await prismaClient.company.findMany({
            skip: skip,
            take: limit,
            orderBy: {
                created_at: "desc",
            },
        });

        return {
            pagination: pagination,
            data: student,
        };
    }

    static async updatePremiumCompany(company_id: string): Promise<void> {
        const statusUpdatedAt = String(Date.now());

        await prismaClient.company.update({
            where: {
                id: company_id,
            },
            data: {
                status: "Premium",
                status_updated_at: statusUpdatedAt,
            },
        });
    }

    static async logoutCurrentAdmin(admin: Administrator): Promise<void> {
        await prismaClient.administrator.update({
            where: {
                username: admin.username,
            },
            data: {
                token: null,
            },
        });
    }
}
