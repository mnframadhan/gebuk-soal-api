/*
  Warnings:

  - Added the required column `package_bundle_id` to the `packageTestUnitWorks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `packageTestUnitWorks` ADD COLUMN `package_bundle_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `packageTestUnitWorks` ADD CONSTRAINT `packageTestUnitWorks_package_bundle_id_fkey` FOREIGN KEY (`package_bundle_id`) REFERENCES `packageBundles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
