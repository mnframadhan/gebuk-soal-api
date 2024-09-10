-- AlterTable
ALTER TABLE `contributors` ADD COLUMN `token` VARCHAR(191) NULL,
    MODIFY `contribution_points` INTEGER NOT NULL DEFAULT 0,
    MODIFY `number_of_soal` INTEGER NOT NULL DEFAULT 0;
