-- AlterTable
ALTER TABLE `students` ADD COLUMN `cpns_tiu_point` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `cpns_tkp_point` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `cpns_twk_point` INTEGER NOT NULL DEFAULT 0;
