-- AlterTable
ALTER TABLE `companies` ADD COLUMN `status_updated_at` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `packageTestResults` ADD COLUMN `end_time` VARCHAR(191) NULL,
    ADD COLUMN `start_time` VARCHAR(191) NULL;
