-- AlterTable
ALTER TABLE `soals` ADD COLUMN `complete_package_id` VARCHAR(191) NULL,
    ADD COLUMN `is_protected` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `orders` INTEGER NULL;

-- CreateTable
CREATE TABLE `completePackages` (
    `id` VARCHAR(191) NOT NULL,
    `package_name` VARCHAR(191) NOT NULL,
    `expired_date` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `n_unit` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `separators` (
    `id` VARCHAR(191) NOT NULL,
    `complete_package_id` VARCHAR(191) NOT NULL,
    `text` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `completePackages` ADD CONSTRAINT `completePackages_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `contributors`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `separators` ADD CONSTRAINT `separators_complete_package_id_fkey` FOREIGN KEY (`complete_package_id`) REFERENCES `completePackages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `soals` ADD CONSTRAINT `soals_complete_package_id_fkey` FOREIGN KEY (`complete_package_id`) REFERENCES `completePackages`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
