import { Work } from "@prisma/client";


export type WorksRequest = {
    answer: string
    duration: string
}

export type ResultsResponse<T> = {

    id: string;
    username: string;
    today_works : number;
    created_at: string;
    number_of_true: number;
    number_of_false: number;
    works: Array<T>
}

export type WorksResultsResponse = {

    soal_id : string;
    category: string;
    label: string;
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
    
}

export function toWorksResultsResponse(result: ResultsResponse<WorksResultsResponse>) {

    return {
        id: result.id,
        username: result.username,
        today_works: result.today_works,
        created_at: result.created_at,
        number_of_true: result.number_of_true,
        number_of_false: result.number_of_false,
        works: result.works
    }

}

export function toWorkResponse(works: Work) {

    return {

        id: works.id,
        username: works.username,
        soal: works.soal_id,
        answer: works.answer,
        result: works.result,
        created_at: works.created_at,
    }
}