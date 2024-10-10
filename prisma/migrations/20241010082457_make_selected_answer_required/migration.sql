/*
  Warnings:

  - Made the column `selected_answer` on table `packageTestUnitWorks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `packageTestUnitWorks` MODIFY `selected_answer` VARCHAR(191) NOT NULL;
