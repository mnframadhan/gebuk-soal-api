import { Student } from "@prisma/client";
import { Paging } from "./pages";

export type StudentRequest = {

    username : string;
    email : string;
    password : string;

}

export type StudentResponse = {

    id : string;
    username : string;
    email : string;
    points : number;
    n_soal : number;
    n_soal_tiu: number;
    n_soal_twk: number;
    n_soal_tkp: number;
    created_at : Date;
    quota: number;
    membership: string;
    token : string | null;
    avatar: string | null;

}

export type LeaderboardStudentData = {
    username : string;
    points: number;
}

export type StudentLeaderboardResponse<LeaderboardStudentData> = {
    
    pagination: Paging;
    data: Array<LeaderboardStudentData>;
}


export type StudentUpdateRequest = {

    username?: string | null;
    avatar?: string | null;

}

export function toStudentLeaderboardResponse(data: LeaderboardStudentData[], pagination: Paging) : StudentLeaderboardResponse<LeaderboardStudentData> {

    return {
        data: data as Array<LeaderboardStudentData>,
        pagination: pagination
    }
}

export function toStudentResponse(student: Student) : StudentResponse {

    return {

        id: student.id,
        username: student.username,
        email: student.email,
        points: student.points,
        n_soal: student.n_soal, 
        n_soal_tiu: student.n_soal_tiu,
        n_soal_twk: student.n_soal_twk,
        n_soal_tkp: student.n_soal_tkp,
        created_at: student.created_at,
        quota: student.quota,
        membership: student.membership,
        token : student.token,
        avatar: student.avatar

    }
}