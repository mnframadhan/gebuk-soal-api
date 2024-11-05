/*
  Warnings:

  - You are about to drop the column `analogical_accuracy_point` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `analytical_point` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `integrity_point` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `leadership_point` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `logical_point` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `loyalty_point` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `text_understanding_point` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `students` DROP COLUMN `analogical_accuracy_point`,
    DROP COLUMN `analytical_point`,
    DROP COLUMN `integrity_point`,
    DROP COLUMN `leadership_point`,
    DROP COLUMN `logical_point`,
    DROP COLUMN `loyalty_point`,
    DROP COLUMN `text_understanding_point`,
    ADD COLUMN `numerik_berhitung` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `numerik_deret_angka` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `numerik_perbandingan_kuantitatif` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `numerik_soal_cerita` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `verbal_analitik` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `verbal_analogi` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `verbal_silogisme` INTEGER NOT NULL DEFAULT 0;
