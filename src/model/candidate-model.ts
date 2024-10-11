export type CandidateCreateRequest = {

	id_number: string;
    full_name: string;
    email: string;
    phone: string;
    address: string;
	city: string;
	district: string;
	sub_district: string;
	postal_code: string;

}

export type CandidateResponse = {

	id_number: string;
    id: string;
    student_id: string;
    full_name: string;
    email: string;
    address: string;
	city: string;
	district: string;
	sub_district: string;
	postal_code: string;
    phone: string;
    created_at: string;
	

}


export type CandidateUpdateRequest = {

    full_name: string | undefined;
    address: string | undefined;
    phone: string | undefined;

}

export type CandidateResultRequest = {

    start_time: string;
    end_time: string;

}
