-- AlterTable
ALTER TABLE `students` ADD COLUMN `bio` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `education_description` VARCHAR(191) NULL,
    ADD COLUMN `education_name` VARCHAR(191) NULL,
    ADD COLUMN `end_year_education` VARCHAR(191) NULL,
    ADD COLUMN `is_present_education` BOOLEAN NULL,
    ADD COLUMN `major` VARCHAR(191) NULL,
    ADD COLUMN `start_year_education` VARCHAR(191) NULL;
