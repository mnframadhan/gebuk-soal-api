-- CreateTable
CREATE TABLE `companies` (
    `id` VARCHAR(191) NOT NULL,
    `brand_name` VARCHAR(191) NOT NULL,
    `legal_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `sector` VARCHAR(191) NOT NULL,
    `sub_sector` VARCHAR(191) NULL,
    `n_employee` VARCHAR(191) NOT NULL,
    `n_package` INTEGER NOT NULL DEFAULT 0,
    `n_applicant` INTEGER NOT NULL DEFAULT 0,
    `token` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `companies_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_units` (
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
    `expired_date` DATETIME(3) NOT NULL,
    `max_duration` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `package_units_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `candidates` (
    `id` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `cv` VARCHAR(191) NULL,
    `token` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `candidates_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packageTestUnitWorks` (
    `id` VARCHAR(191) NOT NULL,
    `package_test_id` VARCHAR(191) NOT NULL,
    `candidate_id` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `start_time` INTEGER NOT NULL,
    `point` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packageTestResults` (
    `id` VARCHAR(191) NOT NULL,
    `package_test_unit_id` VARCHAR(191) NOT NULL,
    `candidate_id` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `start_time` INTEGER NOT NULL,
    `end_time` INTEGER NOT NULL,
    `n_true` INTEGER NOT NULL,
    `n_false` INTEGER NOT NULL,
    `points` INTEGER NOT NULL,
    `results` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `package_units` ADD CONSTRAINT `package_units_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packageTestUnitWorks` ADD CONSTRAINT `packageTestUnitWorks_package_test_id_fkey` FOREIGN KEY (`package_test_id`) REFERENCES `package_units`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packageTestUnitWorks` ADD CONSTRAINT `packageTestUnitWorks_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `candidates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packageTestResults` ADD CONSTRAINT `packageTestResults_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `candidates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
