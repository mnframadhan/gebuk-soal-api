-- DropIndex
DROP INDEX `administrators_pasword_key` ON `administrators`;

-- AlterTable
ALTER TABLE `administrators` ADD COLUMN `token` VARCHAR(191) NULL;
