/*
  Warnings:

  - You are about to drop the `package_units` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `package_units` DROP FOREIGN KEY `package_units_company_id_fkey`;

-- DropForeignKey
ALTER TABLE `package_units` DROP FOREIGN KEY `package_units_package_bundle_id_fkey`;

-- DropForeignKey
ALTER TABLE `packagetestunitworks` DROP FOREIGN KEY `packageTestUnitWorks_package_test_unit_id_fkey`;

-- DropTable
DROP TABLE `package_units`;

-- CreateTable
CREATE TABLE `packageTestUnits` (
    `id` VARCHAR(191) NOT NULL,
    `package_name` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `section` VARCHAR(191) NULL,
    `text` LONGTEXT NULL,
    `text_image` VARCHAR(191) NULL,
    `queston` VARCHAR(191) NULL,
    `option1` LONGTEXT NULL,
    `option1_point` INTEGER NULL,
    `option1_image` VARCHAR(191) NULL,
    `option2` LONGTEXT NULL,
    `option2_point` INTEGER NULL,
    `option2_image` VARCHAR(191) NULL,
    `option3` LONGTEXT NULL,
    `option3_point` INTEGER NULL,
    `option3_image` VARCHAR(191) NULL,
    `option4` LONGTEXT NULL,
    `option4_point` INTEGER NULL,
    `option4_image` VARCHAR(191) NULL,
    `option5` LONGTEXT NULL,
    `option5_point` INTEGER NULL,
    `option5_image` VARCHAR(191) NULL,
    `unique_answer` VARCHAR(191) NULL,
    `token` VARCHAR(191) NULL,
    `created_at` VARCHAR(191) NOT NULL,
    `package_bundle_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `packageTestUnits_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `packageTestUnits` ADD CONSTRAINT `packageTestUnits_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packageTestUnits` ADD CONSTRAINT `packageTestUnits_package_bundle_id_fkey` FOREIGN KEY (`package_bundle_id`) REFERENCES `packageBundles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packageTestUnitWorks` ADD CONSTRAINT `packageTestUnitWorks_package_test_unit_id_fkey` FOREIGN KEY (`package_test_unit_id`) REFERENCES `packageTestUnits`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
