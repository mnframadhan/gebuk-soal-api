import { Student } from "@prisma/client";
import { Paging } from "./pages";

export type StudentRequest = {
    username: string;
    full_name: string | null;
    date_of_birth: string | null;
    email: string;
    password: string;
};

export type StudentResponse = {
    id: string;
    username: string;
    full_name?: String | null;
    email: string;
    date_of_birth?: string | null;
    bio?: string | null;
    education_name?: string | null;
    major?: string | null;
    education_description?: string | null;
    is_present_education?: boolean | null;
    start_year_education?: string | null;
    end_year_education?: string | null;
    points: number;
    n_soal: number;
    cognitive_point: number;
    verbal_analogi: number;
    verbal_silogisme: number;
    verbal_analitik: number;
    numerik_deret_angka: number;
    numerik_perbandingan_kuantitatif: number;
    numerik_soal_cerita: number;
    numerik_berhitung: number;
	nasionalisme: number;
	pilar_negara: number;
	bela_negara: number;
	bahasa_negara: number;
    cpns_tiu_point: number;
    cpns_twk_point: number;
    cpns_tkp_point: number;
    created_at: string;
    quota: number | null;
    membership: string;
	premium_request: string;
    token?: string | null;
    avatar?: string | null;
    verified?: boolean | null;
};

export type LeaderboardStudentData = {
    username: string;
    points: number;
};

export type StudentLeaderboardResponse<LeaderboardStudentData> = {
    pagination: Paging;
    data: Array<LeaderboardStudentData>;
};

export type StudentUpdateAvatar = {
    avatar: string;
};

export type StudentUpdateRequest = {
    username?: string;
    full_name?: string;
    date_of_birth?: string;
    bio?: string;
    education_name?: string;
    major?: string;
    education_description?: string;
    is_present_education?: boolean;
    start_year_education?: string;
    end_year_education?: string;
};

export function toStudentLeaderboardResponse(
    data: LeaderboardStudentData[],
    pagination: Paging
): StudentLeaderboardResponse<LeaderboardStudentData> {
    return {
        data: data as Array<LeaderboardStudentData>,
        pagination: pagination,
    };
}

export function toStudentResponse(student: Student): StudentResponse {
    return {
        id: student.id,
        username: student.username,
        full_name: student.full_name,
        date_of_birth: student.date_of_birth,
        bio: student.bio,
        education_name: student.education_name,
        major: student.major,
        education_description: student.education_description,
        start_year_education: student.start_year_education,
        end_year_education: student.end_year_education,
        is_present_education: student.is_present_education,
        email: student.email,
        points: student.points,
        n_soal: student.n_soal,
        cognitive_point: student.cognitive_point,
        verbal_analogi: student.verbal_analogi,
        verbal_silogisme: student.verbal_silogisme,
        verbal_analitik: student.verbal_analitik,
        numerik_deret_angka: student.numerik_deret_angka,
        numerik_perbandingan_kuantitatif: student.numerik_perbandingan_kuantitatif,
        numerik_soal_cerita: student.numerik_soal_cerita,
        numerik_berhitung: student.numerik_berhitung,
		nasionalisme: student.nasionalisme,
		bela_negara: student.bela_negara,
		pilar_negara: student.pilar_negara,
		bahasa_negara: student.bahasa_negara,
        cpns_tiu_point: student.cpns_tiu_point,
        cpns_twk_point: student.cpns_twk_point,
        cpns_tkp_point: student.cpns_tkp_point,
        created_at: student.created_at,
        quota: student.quota,
        membership: student.membership,
		premium_request: student.premium_request,
        token: student.token,
        avatar: student.avatar,
        verified: student.verified,
    };
}
