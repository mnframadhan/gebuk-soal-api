/*
  Warnings:

  - You are about to alter the column `created_at` on the `contributors` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `created_at` on the `students` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to drop the column `soal_tiu_kata_id` on the `works` table. All the data in the column will be lost.
  - You are about to drop the `soaltiukata` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `soal_id` to the `works` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soal_paragraf_id` to the `works` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `results` DROP FOREIGN KEY `Results_username_fkey`;

-- DropForeignKey
ALTER TABLE `soaltiukata` DROP FOREIGN KEY `soalTIUkata_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `works` DROP FOREIGN KEY `works_soal_tiu_kata_id_fkey`;

-- DropForeignKey
ALTER TABLE `works` DROP FOREIGN KEY `works_username_fkey`;

-- AlterTable
ALTER TABLE `contributors` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `students` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `works` DROP COLUMN `soal_tiu_kata_id`,
    ADD COLUMN `soal_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `soal_paragraf_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `soaltiukata`;

-- CreateTable
CREATE TABLE `administrators` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `pasword` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `administrators_id_key`(`id`),
    UNIQUE INDEX `administrators_username_key`(`username`),
    UNIQUE INDEX `administrators_pasword_key`(`pasword`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `soals` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `text2` VARCHAR(191) NULL,
    `text3` VARCHAR(191) NULL,
    `text4` VARCHAR(191) NULL,
    `text5` VARCHAR(191) NULL,
    `image1` VARCHAR(191) NULL,
    `image2` VARCHAR(191) NULL,
    `image3` VARCHAR(191) NULL,
    `image4` VARCHAR(191) NULL,
    `image5` VARCHAR(191) NULL,
    `question` VARCHAR(191) NOT NULL,
    `option1` VARCHAR(191) NULL,
    `option2` VARCHAR(191) NULL,
    `option3` VARCHAR(191) NULL,
    `option4` VARCHAR(191) NULL,
    `option5` VARCHAR(191) NULL,
    `option_image1` VARCHAR(191) NULL,
    `option_image2` VARCHAR(191) NULL,
    `option_image3` VARCHAR(191) NULL,
    `option_image4` VARCHAR(191) NULL,
    `option_image5` VARCHAR(191) NULL,
    `option_point1` INTEGER NULL,
    `option_point2` INTEGER NULL,
    `option_point3` INTEGER NULL,
    `option_point4` INTEGER NULL,
    `option_point5` INTEGER NULL,
    `answer` VARCHAR(191) NOT NULL,
    `explanation` VARCHAR(191) NULL,
    `explanation_image1` VARCHAR(191) NULL,
    `explanation_image2` VARCHAR(191) NULL,
    `explanation_image3` VARCHAR(191) NULL,
    `explanation_image4` VARCHAR(191) NULL,
    `explanation_image5` VARCHAR(191) NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `soals_id_key`(`id`),
    UNIQUE INDEX `soals_question_key`(`question`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `soals` ADD CONSTRAINT `soals_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `contributors`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `works` ADD CONSTRAINT `works_username_fkey` FOREIGN KEY (`username`) REFERENCES `students`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `works` ADD CONSTRAINT `works_soal_id_fkey` FOREIGN KEY (`soal_id`) REFERENCES `soals`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `results` ADD CONSTRAINT `results_username_fkey` FOREIGN KEY (`username`) REFERENCES `students`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `results` RENAME INDEX `Results_id_key` TO `results_id_key`;
