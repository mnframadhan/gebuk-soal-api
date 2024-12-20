// model berlaku untuk soal-soal Analogi, Silogisme,
// Analitis, dan Deret Angka.

import { Soal } from "@prisma/client";
import { Paging } from "./pages";

export type SoalRequest = {
	category: string;
	sub_category: string | null;
	cpns_category: string | null;
	label: string | null;
	difficulty: "Easy" | "Medium" | "Hard";
	text: string;
	question: string;
	option1: string | null;
	option2: string | null;
	option3: string | null;
	option4: string | null;
	option5: string | null;
	option1_point: number | null;
	option2_point: number | null;
	option3_point: number | null;
	option4_point: number | null;
	option5_point: number | null;
	correct_answer: string;
	explanation: string | null;
	explanation_url_youtube_video: string | null;
	complete_package_id: string | null;
	orders?: number | null;
	is_protected?: boolean;
};

export type SoalResponse = {
	id: string;
	category: string;
	sub_category: string | null;
	cpns_category: string | null;
	label: string | null;
	difficulty: "Easy" | "Medium" | "Hard";
	text: string;
	question: string;
	option1: string | null;
	option2: string | null;
	option3: string | null;
	option4: string | null;
	option5: string | null;
	option1_point: number | null;
	option2_point: number | null;
	option3_point: number | null;
	option4_point: number | null;
	option5_point: number | null;
	correct_answer: string;
	explanation: string | null;
	explanation_url_youtube_video: string | null;
	created_at: string;
	created_by: string | null;
};

export type ShowedSoalResponse = {
	id: string;
	category: string;
	sub_category: string | null;
	cpns_category: string | null;
	label: string | null;
	type: string;
	text: string;
	question: string;
	option1: string | null;
	option2: string | null;
	option3: string | null;
	option4: string | null;
	option5: string | null;
	option1_point: number | null;
	option2_point: number | null;
	option3_point: number | null;
	option4_point: number | null;
	option5_point: number | null;
};

export function toSoalResponse(soal: Soal): SoalResponse {
	return {
		id: soal.id,
		category: soal.category,
		sub_category: soal.sub_category,
		cpns_category: soal.cpns_category,
		label: soal.label,
		difficulty: soal.difficulty,
		text: soal.text,
		option1: soal.option1,
		option2: soal.option2,
		option3: soal.option3,
		option4: soal.option4,
		option5: soal.option5,
		option1_point: soal.option1_point,
		option2_point: soal.option2_point,
		option3_point: soal.option3_point,
		option4_point: soal.option4_point,
		option5_point: soal.option5_point,
		question: soal.question,
		correct_answer: soal.correct_answer,
		explanation: soal.explanation,
		explanation_url_youtube_video: soal.explanation_url_youtube_video,
		created_at: soal.created_at,
		created_by: soal.created_by,
	};
}

export function toSoalResponsePagination(soal: ShowedSoalResponse[], pagination: Paging) {
	return {
		data: soal as Array<ShowedSoalResponse>,
		pagination: pagination,
	};
}
