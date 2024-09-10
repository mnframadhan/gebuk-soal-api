/*
  Warnings:

  - You are about to drop the column `soal_tiu_kata_false` on the `results` table. All the data in the column will be lost.
  - Added the required column `number_of_false` to the `Results` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_of_true` to the `Results` table without a default value. This is not possible if the table is not empty.
  - Added the required column `today_works` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `results` DROP COLUMN `soal_tiu_kata_false`,
    ADD COLUMN `number_of_false` INTEGER NOT NULL,
    ADD COLUMN `number_of_true` INTEGER NOT NULL,
    ADD COLUMN `today_works` INTEGER NOT NULL;
