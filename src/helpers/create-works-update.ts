import { prismaClient } from "../application/database";

export const updateStudentNSoal = async (id: string, category: string) => {
    switch (category) {
        case "Kognitif":
            await prismaClient.student.update({
                where: { id: id },
                data: { cognitive_point: { increment: 1 } },
            });
            break;
        default:
            console.log("No matching case found");
    }
};

export const updateStudentNSoalBySubCategory = async (id: string, sub_category: string) => {
    switch (sub_category) {
        case "Verbal Analogi":
            await prismaClient.student.update({
                where: { id: id },
                data: { verbal_analogi: { increment: 1 } },
            });
            break;
        case "Verbal Analitik":
            await prismaClient.student.update({
                where: { id: id },
                data: { verbal_analitik: { increment: 1 } },
            });
            break;
        case "Verbal Silogisme":
            await prismaClient.student.update({
                where: { id: id },
                data: { verbal_silogisme: { increment: 1 } },
            });
            break;
        case "Numerik Deret Angka":
            await prismaClient.student.update({
                where: { id: id },
                data: { numerik_deret_angka: { increment: 1 } },
            });
            break;
        case "Numerik Perbandingan Kuantitatif":
            await prismaClient.student.update({
                where: { id: id },
                data: { numerik_perbandingan_kuantitatif: { increment: 1 } },
            });
            break;
        case "Numerik Soal Cerita":
            await prismaClient.student.update({
                where: { id: id },
                data: { numerik_soal_cerita: { increment: 1 } },
            });
            break;
        case "Numerik Berhitung":
            await prismaClient.student.update({
                where: { id: id },
                data: { numerik_berhitung: { increment: 1 } },
            });
            break;
        default:
            console.log("No matching case found");
    }
};

export const updateStudentNSoalByCPNSCategory = async (id: string, cpns_category: string) => {
    switch (cpns_category) {
        case "Tes Intelegensi Umum":
            // Case 1: Update student's name
            await prismaClient.student.update({
                where: { id: id },
                data: { cpns_tiu_point: { increment: 1 } },
            });
            break;
        case "Tes Wawasan Kebangsaan":
            // Case 2: Update student's limit
            await prismaClient.student.update({
                where: { id: id },
                data: { cpns_twk_point: { increment: 1 } },
            });
            break;
        case "Tes Karakteristik Pribadi":
            // Case 3: Update both name and limit
            await prismaClient.student.update({
                where: { id: id },
                data: { cpns_tkp_point: { increment: 1 } },
            });
            break;
        default:
            console.log("No matching case found");
    }
};
