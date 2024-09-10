// model berlaku untuk soal-soal Analogi, Silogisme, 
// Analitis, dan Deret Angka.

import { Soal } from "@prisma/client"
import { Paging } from "./pages";

export type SoalRequest = {

    category: string;
    label: string;
    type: string;
    text: string;
    text2?: string | null;
    text3?: string | null;
    text4?: string | null;
    text5?: string | null;
    image1?: string | null;
    image2?: string | null;
    image3?: string | null;
    image4?: string | null;
    image5?: string | null;
    question: string;
    option1?: string | null;
    option2?: string | null;
    option3?: string | null;
    option4?: string | null;
    option5?: string | null;
    option_image1?: string | null;
    option_image2?: string | null;
    option_image3?: string | null;
    option_image4?: string | null;
    option_image5?: string | null;
    option_point1?: number | null;
    option_point2?: number | null;
    option_point3?: number | null;
    option_point4?: number | null;
    option_point5?: number | null;
    answer: string;
    explanation?: string | null;

}

export type SoalResponse = {

    id : string;
    category: string;
    label: string;
    type: string;
    text: string;
    text2?: string | null;
    text3?: string | null;
    text4?: string | null;
    text5?: string | null;
    image1?: string | null;
    image2?: string | null;
    image3?: string | null;
    image4?: string | null;
    image5?: string | null;
    question: string;
    option1?: string | null;
    option2?: string | null;
    option3?: string | null;
    option4?: string | null;
    option5?: string | null;
    option_image1?: string | null;
    option_image2?: string | null;
    option_image3?: string | null;
    option_image4?: string | null;
    option_image5?: string | null;
    option_point1?: number | null;
    option_point2?: number | null;
    option_point3?: number | null;
    option_point4?: number | null;
    option_point5?: number | null;
    answer: string;
    explanation?: string | null;
    created_at: Date;
    created_by?: string | null;

}

export type ShowedSoalResponse = {

    id : string;
    category: string;
    label: string;
    type: string;
    text: string;
    text2?: string | null;
    text3?: string | null;
    text4?: string | null;
    text5?: string | null;
    image1?: string | null;
    image2?: string | null;
    image3?: string | null;
    image4?: string | null;
    image5?: string | null;
    question: string;
    option1?: string | null;
    option2?: string | null;
    option3?: string | null;
    option4?: string | null;
    option5?: string | null;
    option_image1?: string | null;
    option_image2?: string | null;
    option_image3?: string | null;
    option_image4?: string | null;
    option_image5?: string | null;
    option_point1?: number | null;
    option_point2?: number | null;
    option_point3?: number | null;
    option_point4?: number | null;
    option_point5?: number | null;

}

export function toSoalResponse(soal: Soal) : SoalResponse {

    return {
        
        id: soal.id,
        category: soal.category,
        type: soal.type,
        label: soal.label,
        text: soal.text,
        text2: soal.text2,
        text3: soal.text3,
        text4: soal.text4,
        text5: soal.text5,
        image1: soal.image1,
        image2: soal.image2,
        image3: soal.image3,
        image4: soal.image4,
        image5: soal.image5,
        option_image1: soal.option_image1,
        option_image2: soal.option_image2,
        option_image3: soal.option_image3,
        option_image4: soal.option_image4,
        option_image5: soal.option_image5,
        option_point1: soal.option_point1,
        option_point2: soal.option_point2,
        option_point3: soal.option_point3,
        option_point4: soal.option_point4,
        option_point5: soal.option_point5,
        question: soal.question,
        option1: soal.option1,
        option2: soal.option2,
        option3: soal.option3,
        option4: soal.option4,
        option5: soal.option5,
        answer: soal.answer,
        explanation: soal.explanation,
        created_at: soal.created_at,
        created_by: soal.created_by
    }
}

export function toSoalResponsePagination(soal: Soal[], pagination: Paging) {

    return {

        data: soal as Array<ShowedSoalResponse>,
        pagination: pagination

    }

}