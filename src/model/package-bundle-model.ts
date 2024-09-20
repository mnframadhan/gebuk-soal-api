export type PackageBundleCreateRequest = {

    package_name: string;
    expired_date: string;
    max_duration: number | null;
    n_unit: number | null;

}

export type PackageBundleResponse = {

    id: string;
    package_name: string;
    expired_date: string;
    created_at: string;
    token: string | null;
    max_duration: number | null;
    n_unit: number | null;
    present_n_unit: number | null;

}

export type PackageBundleUpdateRequest = {

    package_name?: string;
    expired_date?: string;
    max_duration?: number | null;
    n_unit?: number | null;

}

export type PackageBundlesResponse = {

    message: string;
    company_id: string;
    data: PackageBundleResponse[]

}
