export type PackageTestUnitCreateRequest = {

    text: string | null;
    text_image : string | null;
    question : string | null;
    option1: string | null;
    option1_point: number | null;
    option1_image : string | null;
    option2: string | null;
    option2_point: number | null;
    option2_image : string | null;
    option3: string | null;
    option3_point: number | null;
    option3_image : string | null;
    option4: string | null;
    option4_point: number | null;
    option4_image : string | null;
    option5: string | null;
    option5_point: number | null;
    option5_image : string | null;
    unique_answer: string | null;

}

export type PackageTestUnitResponse = {

    id: string;
    company_id: string;
    text: string | null;
    text_image : string | null;
    question : string | null;
    option1: string | null;
    option1_point: number | null;
    option1_image : string | null;
    option2: string | null;
    option2_point: number | null;
    option2_image : string | null;
    option3: string | null;
    option3_point: number | null;
    option3_image : string | null;
    option4: string | null;
    option4_point: number | null;
    option4_image : string | null;
    option5: string | null;
    option5_point: number | null;
    option5_image : string | null;
    unique_answer: string | null;
    created_at: string;
    package_bundle_id: string;
    token: string | null;

}

export type PackageTestUnitUpdateRequest = {

    text?: string | null;
    text_image?: string | null;
    question? : string | null;
    option1?: string | null;
    option1_point?: number | null;
    option1_image? : string | null;
    option2?: string | null;
    option2_point?: number | null;
    option2_image? : string | null;
    option3?: string | null;
    option3_point?: number | null;
    option3_image? : string | null;
    option4?: string | null;
    option4_point?: number | null;
    option4_image? : string | null;
    option5?: string | null;
    option5_point?: number | null;
    option5_image? : string | null;
    unique_answer?: string | null;

}

export type PackageTestUnitsResponse = {
    message: string;
    package_bundle_id: string;
    data: PackageTestUnitResponse[];
}

export type PackageTestUnitsWorksRequest = {

    selected_answer: string | null;

}

export type PackageTestUnitWorksResponse = {

    id: string;
    selected_answer: string | null;
    end_time: string | null;

}

export type ShowedSingleUnit = {

    id: string;
    package_bundle_id: string;
    text: string | null;
    question: string | null;
    option1: string | null;
    option2: string | null;
    option3: string | null;
    option4: string | null;
    option5: string | null;

}

export type packageTestUnitsPagination = {

    pagination: {
        current_page: number;
        total_page: number;
        size: number | 1;
    },
    data: ShowedSingleUnit[]
}