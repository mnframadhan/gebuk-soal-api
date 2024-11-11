/*
  Warnings:

  - You are about to alter the column `n_unit` on the `completePackages` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `completePackages` MODIFY `n_unit` INTEGER NOT NULL;
