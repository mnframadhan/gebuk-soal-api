/*
  Warnings:

  - You are about to drop the column `math_point` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `numerik_berhitung` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `students` DROP COLUMN `math_point`,
    DROP COLUMN `numerik_berhitung`;
