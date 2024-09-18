/*
  Warnings:

  - You are about to drop the column `expired_date` on the `package_units` table. All the data in the column will be lost.
  - You are about to drop the column `max_duration` on the `package_units` table. All the data in the column will be lost.
  - You are about to drop the column `package_test_id` on the `packagetestunitworks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[student_id]` on the table `candidates` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `student_id` to the `candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `package_bundle_id` to the `package_units` table without a default value. This is not possible if the table is not empty.
  - Added the required column `package_bundle_id` to the `packageTestResults` table without a default value. This is not possible if the table is not empty.
  - Added the required column `package_test_unit_id` to the `packageTestUnitWorks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `packagetestunitworks` DROP FOREIGN KEY `packageTestUnitWorks_package_test_id_fkey`;

-- AlterTable
ALTER TABLE `candidates` ADD COLUMN `student_id` VARCHAR(191) NOT NULL,
    MODIFY `created_at` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `package_units` DROP COLUMN `expired_date`,
    DROP COLUMN `max_duration`,
    ADD COLUMN `package_bundle_id` VARCHAR(191) NOT NULL,
    MODIFY `created_at` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `packagetestresults` ADD COLUMN `package_bundle_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `packagetestunitworks` DROP COLUMN `package_test_id`,
    ADD COLUMN `package_test_unit_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `packageBundles` (
    `id` VARCHAR(191) NOT NULL,
    `package_name` VARCHAR(191) NOT NULL,
    `expired_date` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `candidates_student_id_key` ON `candidates`(`student_id`);

-- AddForeignKey
ALTER TABLE `package_units` ADD CONSTRAINT `package_units_package_bundle_id_fkey` FOREIGN KEY (`package_bundle_id`) REFERENCES `packageBundles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packageBundles` ADD CONSTRAINT `packageBundles_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `candidates` ADD CONSTRAINT `candidates_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packageTestUnitWorks` ADD CONSTRAINT `packageTestUnitWorks_package_test_unit_id_fkey` FOREIGN KEY (`package_test_unit_id`) REFERENCES `package_units`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packageTestResults` ADD CONSTRAINT `packageTestResults_package_bundle_id_fkey` FOREIGN KEY (`package_bundle_id`) REFERENCES `packageBundles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
