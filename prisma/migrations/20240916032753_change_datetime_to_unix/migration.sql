/*
  Warnings:

  - Changed the type of `created_at` on the `candidates` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_at` on the `companies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_at` on the `package_units` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `candidates` DROP COLUMN `created_at`,
    ADD COLUMN `created_at` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `companies` DROP COLUMN `created_at`,
    ADD COLUMN `created_at` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `package_units` DROP COLUMN `created_at`,
    ADD COLUMN `created_at` INTEGER NOT NULL;
