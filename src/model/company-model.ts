export type CompanyRegisterRequest = {

    brand_name : string;
    legal_name: string;
    email : string;
    address: string;
    phone : string;
    password : string;
    sector : string;
    sub_sector : string | null;
    n_employee : string;

}

export type CompanyResponse = {

    id: string;
    brand_name : string;
    legal_name : string;
    email : string;
    phone : string;
    address : string;
    sector : string;
    sub_sector? : string | null;
    n_employee? : string | null;
    n_package : number;
    n_applicant : number;
    created_at : string;
    token? : string | null;
    banner_image?: string | null;

}

export type CompanyLoginRequest = {

    email : string;
    password : string

}