export type PackageBundleCreateRequest = {

    package_name: string;
    expired_date: string;
    created_at: string;

}

export type PackageBundleResponse = {

    id: string;
    package_name: string;
    expired_date: string;
    created_at: string;
    token: string | null;

}

export type PackageBundleUpdateRequest = {

    package_name?: string;
    expired_date?: string;

}

export type PackageBundlesResponse = {

    message: string;
    company_id: string;
    data: PackageBundleResponse[]

}
