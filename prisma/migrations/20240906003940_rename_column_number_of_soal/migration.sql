/*
  Warnings:

  - You are about to drop the column `number_of_soal` on the `contributors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contributors` DROP COLUMN `number_of_soal`,
    ADD COLUMN `n_soal` INTEGER NOT NULL DEFAULT 0;
