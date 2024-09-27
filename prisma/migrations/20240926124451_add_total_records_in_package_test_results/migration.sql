/*
  Warnings:

  - Added the required column `total_records` to the `packageTestResults` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `packageTestResults` ADD COLUMN `total_records` INTEGER NOT NULL;
