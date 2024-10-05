import { prismaClient } from "../application/database"
import { shuffleArray } from "./fisher-yates-shuffle-array"

export async function getSoalWithExcludedIdsbyCat(username: string, category: string) {

    const works = await prismaClient.work.findMany({
        where: {
            username: username,
        },
        select: {
            soal_id: true,
        },
    })

    const ids = works.map(id => id.soal_id)

    const soals = await prismaClient.soal.findMany({
        where: {
            id: { notIn: ids },
            category: category
        },
        select: {
            id: true,
            text: true,
            category: true,
            label: true,
            question: true,
            option1: true,
            option2: true,
            option3: true,
            option4: true,
            option5: true,
        },
    })

    const shuffled =  shuffleArray(soals)
    return shuffled[0]

}

export async function getSoalWithExcludedIds(username: string) {

    const works = await prismaClient.work.findMany({
        where: {
            username: username,
        },
        select: {
            soal_id: true,
        },
    })

    const ids = works.map(id => id.soal_id)

    const soals = await prismaClient.soal.findMany({
        where: {
            id: { notIn: ids },
        },
        select: {
            id: true,
            text: true,
            category: true,
            label: true,
            question: true,
            option1: true,
            option2: true,
            option3: true,
            option4: true,
            option5: true,
        },
    })

    const shuffled =  shuffleArray(soals)
    return shuffled[0]

}