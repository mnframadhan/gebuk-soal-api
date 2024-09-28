export type CandidateCreateRequest = {

    full_name: string;
    email: string;
    address: string;
    phone: string;

}

export type CandidateResponse = {

    id: string;
    student_id: string;
    full_name: string;
    email: string;
    address: string;
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