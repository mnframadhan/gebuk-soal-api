-- AlterTable
ALTER TABLE `candidates` ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `district` VARCHAR(191) NULL,
    ADD COLUMN `postal_code` VARCHAR(191) NULL,
    ADD COLUMN `sub_district` VARCHAR(191) NULL,
    ADD COLUMN `verification_code` VARCHAR(191) NULL,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `address` VARCHAR(191) NULL;
