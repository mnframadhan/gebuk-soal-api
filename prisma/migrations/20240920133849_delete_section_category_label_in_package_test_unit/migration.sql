/*
  Warnings:

  - You are about to drop the column `category` on the `packagetestunits` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `packagetestunits` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `packagetestunits` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `packagetestunits` DROP COLUMN `category`,
    DROP COLUMN `label`,
    DROP COLUMN `section`;
