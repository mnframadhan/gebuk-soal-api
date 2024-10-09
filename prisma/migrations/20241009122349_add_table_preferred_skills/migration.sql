/*
  Warnings:

  - You are about to drop the column `general_preferred_skills` on the `companies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `companies` DROP COLUMN `general_preferred_skills`;

-- CreateTable
CREATE TABLE `preferredSkills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` INTEGER NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `preferredSkills` ADD CONSTRAINT `preferredSkills_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
