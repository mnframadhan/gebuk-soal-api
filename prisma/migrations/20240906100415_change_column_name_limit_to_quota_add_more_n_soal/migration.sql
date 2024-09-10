/*
  Warnings:

  - You are about to drop the column `limit` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `students` DROP COLUMN `limit`,
    ADD COLUMN `n_soal_tiu` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `n_soal_tkp` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `n_soal_twk` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `quota` INTEGER NOT NULL DEFAULT 5;
