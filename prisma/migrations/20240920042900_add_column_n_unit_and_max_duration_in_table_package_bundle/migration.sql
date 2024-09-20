-- AlterTable
ALTER TABLE `packagebundles` ADD COLUMN `max_duration` INTEGER NOT NULL DEFAULT 60,
    ADD COLUMN `n_unit` INTEGER NULL;
