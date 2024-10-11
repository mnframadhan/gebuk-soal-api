/*
  Warnings:

  - Made the column `address` on table `candidates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `candidates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `district` on table `candidates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postal_code` on table `candidates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sub_district` on table `candidates` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `candidates` MODIFY `address` VARCHAR(191) NOT NULL,
    MODIFY `city` VARCHAR(191) NOT NULL,
    MODIFY `district` VARCHAR(191) NOT NULL,
    MODIFY `postal_code` VARCHAR(191) NOT NULL,
    MODIFY `sub_district` VARCHAR(191) NOT NULL;
