/*
  Warnings:

  - You are about to drop the column `queston` on the `packagetestunits` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `packagetestunits` DROP COLUMN `queston`,
    ADD COLUMN `question` VARCHAR(191) NULL;
