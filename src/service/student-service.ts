import { Student } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { StudentRequest, StudentResponse, StudentUpdateRequest, toStudentResponse } from "../model/student-model";
import { StudentValidation } from "../validation/student-validation";
import { Validation } from "../validation/Validation";

export class StudentService {

    static async createStudent(request: StudentRequest) : Promise<StudentResponse> {

        // validation
        const validatedRequest = Validation.validate(StudentValidation.CREATE, request);

        // check if email already exists
        const numberOfEmail : number = await prismaClient.student.count({

            where: {
                email: validatedRequest.email
            }

        });

        if(numberOfEmail != 0) {
            throw new ResponseError(400, "Email already exists")
        };

        // prepare
        const student_id = uuid();
        const created_at = String(Date.now());

        // hasing password
        const hashedPassword = await bcrypt.hash(validatedRequest.password, 10)
        validatedRequest.password = hashedPassword

        const data = {
            ...validatedRequest,
            id: student_id,
            created_at: created_at,

        }

        // insert into database
        const response = await prismaClient.student.create({
            data: data
        })

        return toStudentResponse(response);
    }

    static async loginStudent(request: StudentRequest) : Promise<StudentResponse> {

        // validation
        const validatedRequest = Validation.validate(StudentValidation.LOGIN, request)

        const student  = await prismaClient.student.findFirst({

            where: {
                username: validatedRequest.username
            }
        })

        if (!student) {
            throw new ResponseError(401, "Email or Password incorret")
        }


        // check if ppassword is valid
        const passwordMatch = await bcrypt.compare(validatedRequest.password, student.password);

        if(!passwordMatch) {
            throw new ResponseError(401, "Email or Password incorrect")
        };


        // update student token
        const token = uuid()

        
        const response = await prismaClient.student.update({
            where: {
                username: validatedRequest.username
            },
            data: {
                token: token
            }
        })


        return toStudentResponse(response);
    }

    static async getCurrentStudent(student: Student) : Promise<StudentResponse> {
        return toStudentResponse(student)
    }

    static async updateStudent(request: StudentUpdateRequest, student: Student) : Promise<{id: string, avatar: string,  message: string}> {

        // validation
        const validatedRequest = Validation.validate(StudentValidation.UPDATE, request)

        if(validatedRequest.username) {

            await prismaClient.student.update({

                where: {
                    id: student.id
                },
                data: {
                    username: validatedRequest.username
                }
            })
        }

        if (validatedRequest.avatar) {

            await prismaClient.student.update({

                where: {
                    id: student.id
                },
                data: {
                    avatar: validatedRequest.avatar
                }
            })
        }

        const response = {

            id: student.id,
            message: "Updated",
            avatar: validatedRequest.avatar!

        }

        return response;

    }

    static async logoutCurrentStudent(student: Student) : Promise<void> {

        await prismaClient.student.update({
            where: {
                username: student.username
            },
            data: {
                token: null
            }
        })
    }
}