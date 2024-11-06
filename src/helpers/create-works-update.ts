import { prismaClient } from "../application/database";

export const updateStudentNSoal = async (id: string, category: string, result: boolean) => {
    let points;
    if (result) {
        points = 10;
    } else {
        points = -10;
    }

    switch (category) {
        case "Kognitif":
            await prismaClient.student.update({
                where: { id: id },
                data: { cognitive_point: { increment: points } },
            });
            break;
        default:
            console.log("No matching case found");
    }
};

export const updateStudentNSoalBySubCategory = async (id: string, sub_category: string, result: boolean) => {
    let points;
    if (result) {
        points = 10;
    } else {
        points = -10;
    }

    switch (sub_category) {
        case "Verbal Analogi":
            await prismaClient.student.update({
                where: { id: id },
                data: { verbal_analogi: { increment: points } },
            });
            break;
        case "Verbal Analitik":
            await prismaClient.student.update({
                where: { id: id },
                data: { verbal_analitik: { increment: points } },
            });
            break;
        case "Verbal Silogisme":
            await prismaClient.student.update({
                where: { id: id },
                data: { verbal_silogisme: { increment: points } },
            });
            break;
        case "Numerik Deret Angka":
            await prismaClient.student.update({
                where: { id: id },
                data: { numerik_deret_angka: { increment: points } },
            });
            break;
        case "Numerik Perbandingan Kuantitatif":
            await prismaClient.student.update({
                where: { id: id },
                data: { numerik_perbandingan_kuantitatif: { increment: points } },
            });
            break;
        case "Numerik Soal Cerita":
            await prismaClient.student.update({
                where: { id: id },
                data: { numerik_soal_cerita: { increment: points } },
            });
            break;
        case "Numerik Berhitung":
            await prismaClient.student.update({
                where: { id: id },
                data: { numerik_berhitung: { increment: points } },
            });
            break;
        case "Bela Negara":
            await prismaClient.student.update({
                where: { id: id },
                data: { bela_negara: { increment: points } },
            });
            break;
        case "Integritas":
            await prismaClient.student.update({
                where: { id: id },
                data: { integritas: { increment: points } },
            });
            break;
        case "Pilar Negara":
            await prismaClient.student.update({
                where: { id: id },
                data: { pilar_negara: { increment: points } },
            });
            break;
        case "Nasionalisme":
            await prismaClient.student.update({
                where: { id: id },
                data: { nasionalisme: { increment: points } },
            });
            break;
        case "Bahasa Negara":
            await prismaClient.student.update({
                where: { id: id },
                data: { bahasa_negara: { increment: points } },
            });
            break;
        default:
            console.log("No matching case found");
    }
};

export const updateStudentNSoalByCPNSCategory = async (id: string, cpns_category: string, result: boolean) => {
    let points;
    if (result) {
        points = 10;
    } else {
        points = -10;
    }
    switch (cpns_category) {
        case "Tes Intelegensi Umum":
            // Case 1: Update student's name
            await prismaClient.student.update({
                where: { id: id },
                data: { cpns_tiu_point: { increment: points } },
            });
            break;
        case "Tes Wawasan Kebangsaan":
            // Case 2: Update student's limit
            await prismaClient.student.update({
                where: { id: id },
                data: { cpns_twk_point: { increment: points } },
            });
            break;
        case "Tes Karakteristik Pribadi":
            // Case 3: Update both name and limit
            await prismaClient.student.update({
                where: { id: id },
                data: { cpns_tkp_point: { increment: points } },
            });
            break;
        default:
            console.log("No matching case found");
    }
};
