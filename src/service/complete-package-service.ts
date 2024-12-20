import { Contributor, Student } from "@prisma/client";
import nodemailer, { SentMessageInfo } from "nodemailer";
import { CompletePackageRequest, CompletePackageResponse } from "../model/complete-package-model";
import { Validation } from "../validation/Validation";
import { CompletePackageValidation } from "../validation/soal-validation";
import { prismaClient } from "../application/database";
import { SoalRequest } from "../model/soal-model";
import { v4 as uuid } from "uuid";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";
import { Paging } from "../model/pages";

export class CompletePackageServices {
    static async createCompletePackage(request: CompletePackageRequest, contributor: Contributor): Promise<{ message: string }> {
        const validatedRequest = Validation.validate(CompletePackageValidation.CREATE, request);

        const createdAt = String(Date.now());
        const createdBy = String(contributor.username);

        const data = {
            ...validatedRequest,
            created_at: createdAt,
            created_by: createdBy,
        };

        await prismaClient.completePackage.create({
            data: data,
        });

        return {
            message: "Success",
        };
    }

    static async createManySoalComplete(request: SoalRequest[], contributor: Contributor): Promise<{ message: string }> {
        const completeData = request.map((item) => ({
            id: uuid(),
            created_at: String(Date.now()),
            created_by: contributor.username,
            ...item,
        }));

        await prismaClient.soal.createMany({
            data: completeData,
        });

        await prismaClient.contributor.update({
            where: {
                username: contributor.username,
            },
            data: {
                n_soal: contributor.n_soal + completeData.length,
                contribution_points: contributor.contribution_points + 10 * completeData.length,
            },
        });

        return { message: "Success" };
    }

    static async getCompletePackage(contributor: Contributor): Promise<CompletePackageResponse[]> {
        const completePackage = await prismaClient.completePackage.findMany({
            where: {
                created_by: contributor.username,
            },
        });

        return completePackage;
    }

    static async getAllCompletePackages(): Promise<CompletePackageResponse[]> {
        const completePackages = await prismaClient.completePackage.findMany();
        return completePackages;
    }

    static async getCompletePackageById(complete_package_id: string): Promise<CompletePackageResponse> {
        const completePackage = await prismaClient.completePackage.findFirst({
            where: {
                id: complete_package_id,
            },
        });

        if (!completePackage) {
            throw new ResponseError(404, "Paket Tidak Ditemukan");
        }

        return completePackage;
    }

    static async orderCompletePackage(request: { phoneNumber: string, password: string }, complete_package_id: string, student: Student): Promise<{ message: string }> {

        const isMatched = await bcrypt.compare(request.password, student.password);
        if (!isMatched) {
            throw new ResponseError(401, "Password Salah");
        }

        const alreadyExist = await prismaClient.studentCompletePackage.findFirst({
            where: {
                student_id: student.id,
                complete_package_id: complete_package_id,
            },
        });

        if (alreadyExist) {
            throw new ResponseError(400, "Paket telah dibeli");
        }

        const createdAt = String(Date.now());
        const data = {
            student_id: student.id,
            complete_package_id: complete_package_id,
            created_at: createdAt,
        };

        await prismaClient.studentCompletePackage.create({
            data: data,
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.COMPANY_EMAIL!,
                pass: process.env.EMAIL_PASSWORD!,
            },
        });
        const mailOptions = {
            from: process.env.COMPANY_EMAIL!,
            to: student.email,
            subject: `[Pembelian Paket Tryout] Terimakasih ${student.username}, Order Berhasil!`,
            text: `

Halo, ${student.username},

Terimakasih telah melakukan pemesanan paket dengan id: 

${complete_package_id}

Mohon untuk segera melakukan pembayaran sesuai dengan petunjuk yang diberikan pada saat melakukan pemesanan.

Best regards,
Fitrah Ramadhan
			`,
        };

        try {
            transporter.sendMail(mailOptions, (info: SentMessageInfo) => {
                console.log(`${info}`);
            });
        } catch {
            throw new ResponseError(400, "Terjadi Kesalahan");
        }

		await prismaClient.student.update({
			where: {
				username: student.username
			},
			data: {
				phone_number: request.phoneNumber
			}
		})

        return {
            message: "Success",
        };
    }

    static async cancelOrderCompletePackage(student: Student, completePackageId: string): Promise<{ message: string }> {
        const completePackage = await prismaClient.studentCompletePackage.delete({
            where: {
                student_id: student.id,
                id: completePackageId,
            },
        });

        if (!completePackage) {
            throw new ResponseError(404, "Paket Tidak Ditemukan");
        }

        return { message: "Success" };
    }

    static async getCompletePackageOwned(student: Student): Promise<any> {
        const completePackage = await prismaClient.completePackage.findMany({
            select: {
                package_name: true,
                StudentCompletePackage: {
                    where: {
                        student_id: student.id,
                    },
                },
            },
        });
        return completePackage;
    }

    static async getCompletePackageOwnedById(student: Student, completePackageId: string): Promise<any> {
        const completePackage = await prismaClient.studentCompletePackage.findFirst({
            where: {
                student_id: student.id,
                id: completePackageId,
            },
        });

        if (!completePackage) {
            throw new ResponseError(404, "Tidak Ditemukan");
        }

        return completePackage;
    }

    static async getWorks(student: Student, completePackageId: string, page: number): Promise<{ pagination: Paging; data: any }> {
        const soals = await prismaClient.soal.findMany({
            where: {
                complete_package_id: completePackageId,
            },
        });

        const pagination: Paging = {
            size: 1,
            current_page: page,
            total_page: soals.length,
        };

        return {
            pagination: pagination,
            data: soals,
        };
    }

    static async createWork(request: {}, student: Student, completePackageId: string): Promise<{ message: string }> {
        return { message: "Done" };
    }
}
