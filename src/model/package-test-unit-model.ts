export type PackageTestUnitCreateRequest = {

    company_id: string;
    label: string | null;
    category: string | null;
    section: string | null;
    text: string | null;
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

}

export type PackageTestUnitResponse = {

    id: string;
    company_id: string;
    label: string | null;
    category: string | null;
    section: string | null;
    text: string | null;
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

    label: string | null;
    category: string | null;
    section: string | null;
    text: string | null;
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

export type PackageTestUnitsResponse = {
    message: string;
    company_id: string;
    package_bundle_id: string;
    data: PackageTestUnitResponse[];
}

