/*
  Warnings:

  - Added the required column `difficulty` to the `completePackages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `completePackages` ADD COLUMN `difficulty` INTEGER NOT NULL;
