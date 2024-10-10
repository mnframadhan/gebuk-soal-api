import { Student } from "@prisma/client";
import { Paging } from "./pages";

export type StudentRequest = {

    username : string;
    full_name: string | null;
    date_of_birth: string | null;
    email : string;
    password : string;

}

export type StudentResponse = {

    id : string;
    username : string;
    full_name?: String | null;
    email : string;
	date_of_birth?: string | null;
	bio? : string | null;
	education_name? : string | null;
	major? : string | null;
	education_description? : string | null;
	is_present_education? : boolean | null;
	start_year_education? : string | null;
	end_year_education? : string | null;
    points : number;
    n_soal : number;
    cognitive_point: number;
    math_point: number;
    analytical_point: number;
    logical_point: number;
    text_understanding_point: number;
    analogical_accuracy_point: number;
    leadership_point: number;
    integrity_point: number;
    loyalty_point: number;
    cpns_tiu_point: number;
    cpns_twk_point: number;
    cpns_tkp_point: number;
    created_at : string;
    quota: number;
    membership: string;
    token? : string | null;
    avatar?: string | null;
	verified?: boolean | null;

}

export type LeaderboardStudentData = {
    username : string;
    points: number;
}

export type StudentLeaderboardResponse<LeaderboardStudentData> = {
    
    pagination: Paging;
    data: Array<LeaderboardStudentData>;
}

export type StudentUpdateAvatar = {
	avatar: string;
}


export type StudentUpdateRequest = {

    username?: string; 
	full_name?: string;
	date_of_birth?: string;
	bio? : string;
	education_name? : string;
	major? : string;
	education_descripttion? : string;
	is_present_education? : boolean;
	start_year_education? : string;
	end_year_education?: string;
	
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
        full_name: student.full_name,
        date_of_birth: student.date_of_birth,
        email: student.email,
        points: student.points,
        n_soal : student.n_soal,
        cognitive_point: student.cognitive_point,
        math_point: student.math_point,
        analytical_point: student.analytical_point,
        logical_point: student.logical_point,
        text_understanding_point: student.text_understanding_point,
        analogical_accuracy_point: student.analogical_accuracy_point,
        leadership_point: student.leadership_point,
        integrity_point: student.integrity_point,
        loyalty_point: student.loyalty_point,
        cpns_tiu_point: student.cpns_tiu_point,
        cpns_twk_point: student.cpns_twk_point,
        cpns_tkp_point: student.cpns_tkp_point,
        created_at: student.created_at,
        quota: student.quota,
        membership: student.membership,
        token : student.token,
        avatar: student.avatar,
		verified: student.verified

    }
}
