-- AlterTable
ALTER TABLE `companies` ADD COLUMN `verification_code` VARCHAR(191) NULL,
    ADD COLUMN `verified` BOOLEAN NULL;
