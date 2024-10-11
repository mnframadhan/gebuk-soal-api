/*
  Warnings:

  - The primary key for the `candidates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id_number` to the `candidates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `candidates` DROP PRIMARY KEY,
    ADD COLUMN `id_number` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_number`);
