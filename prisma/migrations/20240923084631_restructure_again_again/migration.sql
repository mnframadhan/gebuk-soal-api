/*
  Warnings:

  - You are about to drop the column `answered_option1` on the `packagetestunitworks` table. All the data in the column will be lost.
  - You are about to drop the column `answered_option2` on the `packagetestunitworks` table. All the data in the column will be lost.
  - You are about to drop the column `answered_option3` on the `packagetestunitworks` table. All the data in the column will be lost.
  - You are about to drop the column `answered_option4` on the `packagetestunitworks` table. All the data in the column will be lost.
  - You are about to drop the column `answered_option5` on the `packagetestunitworks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `packagetestunitworks` DROP COLUMN `answered_option1`,
    DROP COLUMN `answered_option2`,
    DROP COLUMN `answered_option3`,
    DROP COLUMN `answered_option4`,
    DROP COLUMN `answered_option5`,
    ADD COLUMN `selected_answer` VARCHAR(191) NULL;
