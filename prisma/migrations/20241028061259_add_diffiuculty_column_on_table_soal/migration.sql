/*
  Warnings:

  - Added the required column `difficulty` to the `soals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `soals` ADD COLUMN `difficulty` ENUM('Easy', 'Medium', 'Hard') NOT NULL;

UPDATE `soals` SET `difficulty`="Easy";
