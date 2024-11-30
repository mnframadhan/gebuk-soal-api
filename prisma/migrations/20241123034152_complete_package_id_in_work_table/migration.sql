-- AlterTable
ALTER TABLE `works` ADD COLUMN `student_complete_package_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `works` ADD CONSTRAINT `works_student_complete_package_id_fkey` FOREIGN KEY (`student_complete_package_id`) REFERENCES `StudentCompletePackage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
