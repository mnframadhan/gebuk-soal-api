/*
  Warnings:

  - Added the required column `category` to the `completePackages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `completePackages` ADD COLUMN `category` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `StudentCompletePackage` (
    `id` VARCHAR(191) NOT NULL,
    `student_id` VARCHAR(191) NOT NULL,
    `complete_package_id` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Menunggu Pembayaran',
    `validity` BOOLEAN NOT NULL DEFAULT false,
    `result` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StudentCompletePackage` ADD CONSTRAINT `StudentCompletePackage_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentCompletePackage` ADD CONSTRAINT `StudentCompletePackage_complete_package_id_fkey` FOREIGN KEY (`complete_package_id`) REFERENCES `completePackages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
