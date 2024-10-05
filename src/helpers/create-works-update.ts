import { prismaClient } from "../application/database";

export const updateStudentNSoal = async (id : string, category: string) => {
    // switch (category) {
    //   case "Tes Intelegensi Umum":
    //     // Case 1: Update student's name
    //     await prismaClient.student.update({
    //       where: { id: id },
    //       data: { n_soal_tiu: {increment: 1} },
    //     });
    //     break;
    //   case "Tes Wawasan Kebangsaan":
    //     // Case 2: Update student's limit
    //     await prismaClient.student.update({
    //       where: { id: id },
    //       data: { n_soal_twk: {increment: 1} },
    //     });
    //     break;
    //   case "Tes Karakteristik Pribadi":
    //     // Case 3: Update both name and limit
    //     await prismaClient.student.update({
    //       where: { id: id },
    //       data: { n_soal_tkp: {increment: 1} },
    //     });
    //     break;
    //   default:
    //     console.log('No matching case found');
    // }
  };