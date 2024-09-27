/*
  Warnings:

  - You are about to drop the column `end_time` on the `packageTestResults` table. All the data in the column will be lost.
  - You are about to drop the column `package_test_unit_id` on the `packageTestResults` table. All the data in the column will be lost.
  - You are about to drop the column `results` on the `packageTestResults` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `packageTestResults` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `packageTestResults` DROP COLUMN `end_time`,
    DROP COLUMN `package_test_unit_id`,
    DROP COLUMN `results`,
    DROP COLUMN `start_time`;
