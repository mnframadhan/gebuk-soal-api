/*
  Warnings:

  - You are about to drop the column `student_id` on the `packageTestUnitWorks` table. All the data in the column will be lost.
  - Added the required column `candidate_id` to the `packageTestUnitWorks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `packageTestUnitWorks` DROP FOREIGN KEY `packageTestUnitWorks_student_id_fkey`;

-- AlterTable
ALTER TABLE `packageTestUnitWorks` DROP COLUMN `student_id`,
    ADD COLUMN `candidate_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `packageTestUnitWorks` ADD CONSTRAINT `packageTestUnitWorks_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `candidates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
