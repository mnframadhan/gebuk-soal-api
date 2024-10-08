import { prismaClient } from "../application/database";

export const updateStudentNSoal = async (id: string, category: string) => {
    switch (category) {
        case "Cognitive":
            // Case 1: Update student's name
            await prismaClient.student.update({
                where: { id: id },
                data: { cognitive_point: { increment: 1 } },
            });
            break;
        case "Leadership":
            // Case 2: Update student's limit
            await prismaClient.student.update({
                where: { id: id },
                data: { leadership_point: { increment: 1 } },
            });
            break;
        case "Integrity":
            // Case 3: Update both name and limit
            await prismaClient.student.update({
                where: { id: id },
                data: { integrity_point: { increment: 1 } },
            });
            break;
        case "Loyalty":
            // Case 4: Update both name and limit
            await prismaClient.student.update({
                where: { id: id },
                data: { loyalty_point: { increment: 1 } },
            });
            break;
        default:
            console.log("No matching case found");
    }
};

export const updateStudentNSoalBySubCategory = async (id: string, sub_category: string) => {
    switch (sub_category) {
        case "Accuracy of Analogy":
            await prismaClient.student.update({
                where: { id: id },
                data: { analogical_accuracy_point: { increment: 1 } },
            });

            break;
        case "Analytical Thinking":
            await prismaClient.student.update({
                where: { id: id },
                data: { analytical_point: { increment: 1 } },
            });

            break;
        case "Logical Reasoning":
            await prismaClient.student.update({
                where: { id: id },
                data: { logical_point: { increment: 1 } },
            });

            break;
        case "Math Thinking":
            await prismaClient.student.update({
                where: { id: id },
                data: { math_point: { increment: 1 } },
            });

            break;
        case "Text Understanding":
            await prismaClient.student.update({
                where: {id: id},
                data: {text_understanding_point: {increment: 1}}
            })

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
                where : {id: id},
                data: {cpns_tiu_point: {increment: 1}},
        })
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
