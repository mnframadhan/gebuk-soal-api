import { Student } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { StudentRequest, StudentResponse, StudentUpdateRequest, toStudentResponse, StudentUpdateAvatar } from "../model/student-model";
import { StudentValidation } from "../validation/student-validation";
import { Validation } from "../validation/Validation";
import nodemailer, { SentMessageInfo } from "nodemailer";
import { get4RandomDigits } from "../helpers/get-4-random-digit";

export class StudentService {
    static async createStudent(request: StudentRequest): Promise<StudentResponse> {
        // validation
        const validatedRequest = Validation.validate(StudentValidation.CREATE, request);

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

        const auth_digits = get4RandomDigits();
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
            subject: `[Verifikasi Akun] Terimakasih ${validatedRequest.username}, Kamu Telah Melakukan Registrasi Akun Ruang Ujian`,
            text: `Kode Autentikasi 4-digit angka: ${auth_digits}`,
        };

        try {
            transporter.sendMail(mailOptions, (info: SentMessageInfo) => {
                console.log(`${info}`);
            });
        } catch {
			throw new ResponseError(400, "Terjadi Kesalahan")
		}

        return toStudentResponse(response);
    }

    static async studentEmailVerification(request: { verificationCode: string }, student: Student): Promise<{ message: string }> {
        const verificationCode = await bcrypt.compare(request.verificationCode, student.verification_code!);

        if (!verificationCode) {
            throw new ResponseError(422, "Verifikasi Gagal");
        }

        const updateStudent = await prismaClient.student.update({
            where: { id: student.id },
            data: { verified: true },
        });

        if (!updateStudent) {
            throw new ResponseError(401, "Gagal diupdate");
        }

        const mailOptions = {
            from: process.env.COMPANY_EMAIL!,
            to: student.email,
            subject: `[BERHASIL VERIFIKASI] Terimakasih ${student.username}, akun berhasil di-verifikasi`,
            text: `Selamat, akun berhasil di-verifikasi. Ayo mulai rutin menjawab soal-soal ujian. Semakin banyak latihan, semakin pandai kamu menjawab soal.`,
        };

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.COMPANY_EMAIL!,
                pass: process.env.EMAIL_PASSWORD!,
            },
        });

        try {
            transporter.sendMail(mailOptions, (info: SentMessageInfo) => {
                console.log(`${info}`);
            });
        } catch {
			throw new ResponseError(400, "Terjadi Kesalahan")
		}

        return { message: "Akun berhasil di-verifikasi!" };
    }

    static async resendEmailVerification(student: Student): Promise<{ message: string }> {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.COMPANY_EMAIL!,
                pass: process.env.EMAIL_PASSWORD!,
            },
        });

        const auth_digits = get4RandomDigits();
        const hashed_auth_digits = await bcrypt.hash(auth_digits, 8);

        const mailOptions = {
            from: process.env.COMPANY_EMAIL!,
            to: student.email,
            subject: `[Re-send Verifikasi] Terimakasih ${student.username}, Kamu Telah Melakukan Registrasi Akun Ruang Ujian`,
            text: `Kode Autentikasi 4-digit angka: ${auth_digits}`,
        };

        await prismaClient.student.update({
            where: {
                username: student.username,
            },
            data: {
                verification_code: hashed_auth_digits,
            },
        });

        try {
            transporter.sendMail(mailOptions, (info: SentMessageInfo) => {
                console.log(`${info}`);
            });
        } catch {
            throw new ResponseError(400, "Terjadi Kesalahan");
        }

        return { message: "Resend Success" };
    }

    static async loginStudent(request: StudentRequest): Promise<StudentResponse> {
        // validation
        const validatedRequest = Validation.validate(StudentValidation.LOGIN, request);

        const student = await prismaClient.student.findFirst({
            where: {
                username: validatedRequest.username,
            },
        });

        if (!student) {
            throw new ResponseError(401, "Email or Password incorret");
        }

        // check if ppassword is valid
        const passwordMatch = await bcrypt.compare(validatedRequest.password, student.password);

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

    static async updateStudent(request: StudentUpdateRequest, student: Student): Promise<{ message: string }> {
        const validatedRequest = Validation.validate(StudentValidation.UPDATE, request);

        if (validatedRequest.is_present_education === null) {
            validatedRequest.is_present_education = false;
        }

        await prismaClient.student.update({
            where: { id: student.id },
            data: {
                ...(validatedRequest.username !== undefined && { username: validatedRequest.username }),
                ...(validatedRequest.bio !== undefined && { bio: validatedRequest.bio }),
                ...(validatedRequest.full_name !== undefined && { full_name: validatedRequest.full_name }),
                ...(validatedRequest.date_of_birth !== undefined && { date_of_birth: validatedRequest.date_of_birth }),
                ...(validatedRequest.education_name !== undefined && {
                    education_name: validatedRequest.education_name,
                }),
                ...(validatedRequest.major !== undefined && { major: validatedRequest.major }),
                ...(validatedRequest.education_description !== undefined && {
                    education_description: validatedRequest.education_description,
                }),
                ...(validatedRequest.is_present_education !== undefined && {
                    is_present_education: validatedRequest.is_present_education,
                }),
                ...(validatedRequest.start_year_education !== undefined && {
                    start_year_education: validatedRequest.start_year_education,
                }),
                ...(validatedRequest.end_year_education !== undefined && {
                    end_year_education: validatedRequest.end_year_education,
                }),
            },
        });

        return { message: "UPDATED" };
    }

    static async updateAvatar(request: StudentUpdateAvatar, student: Student): Promise<{ message: string }> {
        const validatedRequest = Validation.validate(StudentValidation.AVATAR_UPDATE, request);

        await prismaClient.student.update({
            where: { id: student.id },
            data: validatedRequest,
        });

        return { message: "AVATAR UPDATED" };
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
