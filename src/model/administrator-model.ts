import { Administrator } from "@prisma/client";
import { Paging } from "./pages";
import { StudentResponse } from "./student-model";

export type AdministratorRequest = {

    username: string;
    password: string;

}

export type AdministratorResponse = {

    username: string;
    token?: string | null;
}

export type StudentPagination<StudentResponse> = {

    pagination: Paging,
    data: Array<StudentResponse>

}

export function toAdministratorResponse(administrator: Administrator) : AdministratorResponse {

    return {
        username: administrator.username,
        token: administrator.token
    }
}

export function toAllStudentPagination(data: Array<StudentResponse>, pagination: Paging): StudentPagination<StudentResponse> {

    return {
        pagination: pagination,
        data: data
    }
}