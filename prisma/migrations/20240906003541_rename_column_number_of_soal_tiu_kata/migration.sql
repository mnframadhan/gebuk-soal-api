/*
  Warnings:

  - You are about to drop the column `number_of_soal_tiu_kata` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `students` DROP COLUMN `number_of_soal_tiu_kata`,
    ADD COLUMN `n_soal` INTEGER NOT NULL DEFAULT 0;
