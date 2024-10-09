export type CompanyRegisterRequest = {
    brand_name: string;
    legal_name: string;
    email: string;
    address: string;
    phone: string;
    password: string;
    sector: string;
    sub_sector: string | null;
    n_employee: string;
};

export type CompanyShowedResponse = {
    brand_name: string;
    logo: string;
    general_skill_preferred: { name: string }[] | null;
    package_bundle_list: string;
};

export type CompanyResponse = {
    id: string;
    brand_name: string;
    legal_name: string;
    email: string;
    phone: string;
    address: string;
    sector: string;
    sub_sector?: string | null;
    n_employee?: string | null;
    n_package: number;
    n_applicant: number;
    created_at: string;
    token?: string | null;
    banner_image?: string | null;
    verified: boolean | null;
    general_preferred_skills?: { name: string }[] | null;
    package_bundle?: {
        id: string;
        package_name: string;
        expired_date: string;
        created_at: string;
        token: string | null;
        max_duration: number | null;
        n_unit: number | null;
        present_n_unit: number | null;
    }[] | null;
};

export type CompanyLoginRequest = {
    email: string;
    password: string;
};
