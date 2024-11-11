export type CompletePackageRequest = {
    package_name: string;
    expired_date: string;
    created_at: string;
    created_by: string;
    n_unit: number;
	difficulty: number;
};

export type CompletePackageResponse = {
	id: string;
    package_name: string;
    expired_date: string;
    created_at: string;
    created_by: string;
    n_unit: number;
	difficulty: number;
}

export type SoalBundle = {

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
	orders: number | null;
	is_protected: boolean
	
}
