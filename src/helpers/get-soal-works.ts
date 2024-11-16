import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { shuffleArray } from "./fisher-yates-shuffle-array";

export async function getSoalWithExcludedIdsbyCat(username: string, category: string) {
    const works = await prismaClient.work.findMany({
        where: {
            username: username,
        },
        select: {
            soal_id: true,
        },
    });

    const ids = works.map((id) => id.soal_id);

    const soals = await prismaClient.soal.findMany({
        where: {
            id: { notIn: ids },
            is_protected: false,
            category: category,
        },
        select: {
            id: true,
            text: true,
            category: true,
            sub_category: true,
            label: true,
            difficulty: true,
            question: true,
            option1: true,
            option2: true,
            option3: true,
            option4: true,
            option5: true,
        },
    });

    const shuffled = shuffleArray(soals)[0];

    if (!shuffled) {
        return new ResponseError(404, "Kumpulan Soal telah habis");
    } else {
        return shuffled;
    }
}

export async function getSoalWithExcludedIds(username: string) {
    const works = await prismaClient.work.findMany({
        where: {
            username: username,
        },
        select: {
            soal_id: true,
        },
    });

    if (!works) {
        throw new ResponseError(404, "Soal Tidak Tersedia");
    }

    const ids = works.map((id) => id.soal_id);

    const soals = await prismaClient.soal.findMany({
        where: {
            id: { notIn: ids },
            is_protected: false,
        },
        select: {
            id: true,
            text: true,
            category: true,
            sub_category: true,
            label: true,
            difficulty: true,
            question: true,
            option1: true,
            option2: true,
            option3: true,
            option4: true,
            option5: true,
        },
    });

    const shuffled = shuffleArray(soals)[0];

    if (!shuffled) {
        return new ResponseError(404, "Kumpulan Soal telah habis");
    } else {
        return shuffled;
    }
}
