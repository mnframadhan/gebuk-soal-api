/*
  Warnings:

  - Added the required column `message` to the `Touch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Touch` ADD COLUMN `message` LONGTEXT NOT NULL;
