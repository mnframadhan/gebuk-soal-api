/*
  Warnings:

  - Added the required column `ord` to the `packageTestUnits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `packagetestunits` ADD COLUMN `ord` INTEGER NOT NULL;
