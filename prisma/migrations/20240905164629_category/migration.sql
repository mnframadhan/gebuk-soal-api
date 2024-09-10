/*
  Warnings:

  - You are about to drop the column `kategori` on the `soals` table. All the data in the column will be lost.
  - Added the required column `category` to the `soals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `soals` DROP COLUMN `kategori`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL;
