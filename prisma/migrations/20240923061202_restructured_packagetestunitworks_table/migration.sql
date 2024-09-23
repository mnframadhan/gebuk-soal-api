/*
  Warnings:

  - You are about to drop the column `answer` on the `packagetestunitworks` table. All the data in the column will be lost.
  - You are about to drop the column `candidate_id` on the `packagetestunitworks` table. All the data in the column will be lost.
  - You are about to drop the column `point` on the `packagetestunitworks` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `packagetestunitworks` table. All the data in the column will be lost.
  - Added the required column `end_time` to the `packageTestUnitWorks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `packageTestUnitWorks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `packagetestunitworks` DROP FOREIGN KEY `packageTestUnitWorks_candidate_id_fkey`;

-- AlterTable
ALTER TABLE `packagetestunitworks` DROP COLUMN `answer`,
    DROP COLUMN `candidate_id`,
    DROP COLUMN `point`,
    DROP COLUMN `start_time`,
    ADD COLUMN `answered_option1` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `answered_option2` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `answered_option3` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `answered_option4` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `answered_option5` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `end_time` INTEGER NOT NULL,
    ADD COLUMN `question` VARCHAR(191) NULL,
    ADD COLUMN `student_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `text` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `packageTestUnitWorks` ADD CONSTRAINT `packageTestUnitWorks_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
