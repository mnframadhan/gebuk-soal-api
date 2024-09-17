-- DropIndex
DROP INDEX `companies_email_key` ON `companies`;

-- AlterTable
ALTER TABLE `companies` MODIFY `created_at` BIGINT NOT NULL;
