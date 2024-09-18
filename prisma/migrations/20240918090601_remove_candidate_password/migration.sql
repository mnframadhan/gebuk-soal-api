/*
  Warnings:

  - You are about to drop the column `password` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `candidates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `candidates` DROP COLUMN `password`,
    DROP COLUMN `token`;
