export type CandidateCreateRequest = {

    full_name: string;
    email: string;
    address: string;
    phone: string;
    cv: string | null;

}

export type CandidateResponse = {

    id: string;
    student_id: string;
    full_name: string;
    email: string;
    address: string;
    phone: string;
    cv: string | null;
    created_at: string;

}


export type CandidateUpdateRequest = {

    full_name: string | undefined;
    address: string | undefined;
    phone: string | undefined;
    cv: string | undefined;

}