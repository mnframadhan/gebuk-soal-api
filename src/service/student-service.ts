import { Student } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
    StudentRequest,
    StudentResponse,
    StudentUpdateRequest,
    toStudentResponse,
} from "../model/student-model";
import { StudentValidation } from "../validation/student-validation";
import { Validation } from "../validation/Validation";
import nodemailer, { SentMessageInfo } from "nodemailer";
import { get4RandomDigits } from "../helpers/get-4-random-digit";

export class StudentService {
    static async createStudent(
        request: StudentRequest
    ): Promise<StudentResponse> {
        // validation
        const validatedRequest = Validation.validate(
            StudentValidation.CREATE,
            request
        );

        // check if email already exists
        const numberOfEmail: number = await prismaClient.student.count({
            where: {
                email: validatedRequest.email,
            },
        });

        if (numberOfEmail != 0) {
            throw new ResponseError(400, "Email already exists");
        }

        // prepare
        const student_id = uuid();
        const created_at = String(Date.now());

        // hasing password
        const hashedPassword = await bcrypt.hash(validatedRequest.password, 10);
        validatedRequest.password = hashedPassword;
		

		const auth_digits= get4RandomDigits();
        const hashed_auth_digits = await bcrypt.hash(auth_digits, 8);

		const data = {
            ...validatedRequest,
            id: student_id,
            created_at: created_at,
			verification_code: hashed_auth_digits,
        };

        // insert into database
        const response = await prismaClient.student.create({
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
            to: validatedRequest.email,
            subject: `[Verifikasi Akun] Terimakasih ${validatedRequest.username}, Kamu Telah Melakukan Registrasi Akun Cipta Talenta`,
            text: `Kode Autentikasi 5-digit angka: ${auth_digits}`,
        };

        transporter.sendMail(
            mailOptions,
            (error: Error | null, info: SentMessageInfo) => {
                if (error) {
                    throw new ResponseError(422, "Invalid Email");
                }
                console.log(`Email sent ${info.response}`);
            }
        );

        return toStudentResponse(response);
    }

    static async studentEmailVerification( request: { verificationCode: string }, student: Student ): Promise<{ message: string }> {
		
        const verificationCode = await bcrypt.compare(request.verificationCode, student.verification_code!);
		
        if (!verificationCode) {
			throw new ResponseError(422, "Verifikasi Gagal");
        } 
        
		await prismaClient.student.update({
             where: { id: student.id },
             data: { verified: true },
         });


        return { message: "Akun berhasil di-verifikasi!" };
    }

    static async loginStudent(
        request: StudentRequest
    ): Promise<StudentResponse> {
        // validation
        const validatedRequest = Validation.validate(
            StudentValidation.LOGIN,
            request
        );

        const student = await prismaClient.student.findFirst({
            where: {
                username: validatedRequest.username,
            },
        });

        if (!student) {
            throw new ResponseError(401, "Email or Password incorret");
        }

        // check if ppassword is valid
        const passwordMatch = await bcrypt.compare(
            validatedRequest.password,
            student.password
        );

        if (!passwordMatch) {
            throw new ResponseError(401, "Email or Password incorrect");
        }

        // update student token
        const token = uuid();

        const response = await prismaClient.student.update({
            where: {
                username: validatedRequest.username,
            },
            data: {
                token: token,
            },
        });

        return toStudentResponse(response);
    }

    static async getCurrentStudent(student: Student): Promise<StudentResponse> {
        return toStudentResponse(student);
    }

    static async updateStudent(
        request: StudentUpdateRequest,
        student: Student
    ): Promise<{ id: string; avatar: string; message: string }> {
        // validation
        const validatedRequest = Validation.validate(
            StudentValidation.UPDATE,
            request
        );

        if (validatedRequest.username) {
            await prismaClient.student.update({
                where: {
                    id: student.id,
                },
                data: {
                    username: validatedRequest.username,
                },
            });
        }

        if (validatedRequest.avatar) {
            await prismaClient.student.update({
                where: {
                    id: student.id,
                },
                data: {
                    avatar: validatedRequest.avatar,
                },
            });
        }

        const response = {
            id: student.id,
            message: "Updated",
            avatar: validatedRequest.avatar!,
        };

        return response;
    }

    static async logoutCurrentStudent(student: Student): Promise<void> {
        await prismaClient.student.update({
            where: {
                username: student.username,
            },
            data: {
                token: null,
            },
        });
    }
}
