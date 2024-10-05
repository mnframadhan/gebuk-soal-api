-- CreateTable
CREATE TABLE `administrators` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NULL,

    UNIQUE INDEX `administrators_id_key`(`id`),
    UNIQUE INDEX `administrators_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contributors` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `contribution_points` INTEGER NOT NULL DEFAULT 0,
    `n_soal` INTEGER NOT NULL DEFAULT 0,
    `created_at` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NULL,

    UNIQUE INDEX `contributors_id_key`(`id`),
    UNIQUE INDEX `contributors_username_key`(`username`),
    UNIQUE INDEX `contributors_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL DEFAULT 0,
    `n_soal` INTEGER NOT NULL DEFAULT 0,
    `cognitive_point` INTEGER NOT NULL DEFAULT 0,
    `math_point` INTEGER NOT NULL DEFAULT 0,
    `analytical_point` INTEGER NOT NULL DEFAULT 0,
    `logical_point` INTEGER NOT NULL DEFAULT 0,
    `text_understanding_point` INTEGER NOT NULL DEFAULT 0,
    `analogical_accuracy_point` INTEGER NOT NULL DEFAULT 0,
    `leadership_point` INTEGER NOT NULL DEFAULT 0,
    `integrity_point` INTEGER NOT NULL DEFAULT 0,
    `loyalty_point` INTEGER NOT NULL DEFAULT 0,
    `quota` INTEGER NOT NULL DEFAULT 5,
    `created_at` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NULL,
    `membership` VARCHAR(191) NOT NULL DEFAULT 'Basic',
    `avatar` VARCHAR(191) NULL,
    `premium_request` VARCHAR(191) NOT NULL DEFAULT 'None',
    `premium_at` VARCHAR(191) NULL,

    UNIQUE INDEX `students_id_key`(`id`),
    UNIQUE INDEX `students_username_key`(`username`),
    UNIQUE INDEX `students_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `created_at` VARCHAR(191) NOT NULL,
    `banner_image` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL DEFAULT 'Free',
    `requested_to_update_at` VARCHAR(191) NULL,
    `status_updated_at` VARCHAR(191) NULL,

    UNIQUE INDEX `companies_id_key`(`id`),
    UNIQUE INDEX `companies_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packageTestUnits` (
    `id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NULL,
    `text_image` VARCHAR(191) NULL,
    `question` VARCHAR(191) NULL,
    `option1` VARCHAR(191) NULL,
    `option1_point` INTEGER NULL,
    `option1_image` VARCHAR(191) NULL,
    `option2` VARCHAR(191) NULL,
    `option2_point` INTEGER NULL,
    `option2_image` VARCHAR(191) NULL,
    `option3` VARCHAR(191) NULL,
    `option3_point` INTEGER NULL,
    `option3_image` VARCHAR(191) NULL,
    `option4` VARCHAR(191) NULL,
    `option4_point` INTEGER NULL,
    `option4_image` VARCHAR(191) NULL,
    `option5` VARCHAR(191) NULL,
    `option5_point` INTEGER NULL,
    `option5_image` VARCHAR(191) NULL,
    `unique_answer` VARCHAR(191) NULL,
    `token` VARCHAR(191) NULL,
    `created_at` VARCHAR(191) NOT NULL,
    `package_bundle_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `packageTestUnits_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packageBundles` (
    `id` VARCHAR(191) NOT NULL,
    `package_name` VARCHAR(191) NOT NULL,
    `expired_date` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,
    `n_unit` INTEGER NULL,
    `max_duration` INTEGER NULL,
    `token` VARCHAR(191) NULL,
    `present_n_unit` INTEGER NULL DEFAULT 0,
    `company_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `candidates` (
    `id` VARCHAR(191) NOT NULL,
    `student_id` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `candidates_id_key`(`id`),
    UNIQUE INDEX `candidates_student_id_key`(`student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packageTestUnitWorks` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NULL,
    `question` VARCHAR(191) NULL,
    `selected_answer` VARCHAR(191) NULL,
    `start_time` VARCHAR(191) NULL,
    `end_time` VARCHAR(191) NULL,
    `student_id` VARCHAR(191) NOT NULL,
    `package_bundle_id` VARCHAR(191) NOT NULL,
    `package_test_unit_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packageTestResults` (
    `id` VARCHAR(191) NOT NULL,
    `candidate_id` VARCHAR(191) NOT NULL,
    `total_records` INTEGER NOT NULL,
    `start_time` VARCHAR(191) NULL,
    `end_time` VARCHAR(191) NULL,
    `duration` INTEGER NOT NULL,
    `n_true` INTEGER NOT NULL,
    `n_false` INTEGER NOT NULL,
    `points` DECIMAL(65, 30) NOT NULL,
    `package_bundle_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(191) NOT NULL,
    `student_id` VARCHAR(191) NULL,
    `qty` INTEGER NOT NULL DEFAULT 0,
    `price` INTEGER NOT NULL DEFAULT 2000,
    `discount` DOUBLE NOT NULL DEFAULT 0,
    `sub_total` INTEGER NOT NULL,
    `order_date` VARCHAR(191) NOT NULL,
    `payment_date` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Menunggu Pembayaran',

    UNIQUE INDEX `orders_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `soals` (
    `id` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `text2` VARCHAR(191) NULL,
    `text3` VARCHAR(191) NULL,
    `text4` VARCHAR(191) NULL,
    `text5` VARCHAR(191) NULL,
    `image1` VARCHAR(191) NULL,
    `image2` VARCHAR(191) NULL,
    `image3` VARCHAR(191) NULL,
    `image4` VARCHAR(191) NULL,
    `image5` VARCHAR(191) NULL,
    `question` VARCHAR(191) NOT NULL,
    `option1` VARCHAR(191) NULL,
    `option2` VARCHAR(191) NULL,
    `option3` VARCHAR(191) NULL,
    `option4` VARCHAR(191) NULL,
    `option5` VARCHAR(191) NULL,
    `option_image1` VARCHAR(191) NULL,
    `option_image2` VARCHAR(191) NULL,
    `option_image3` VARCHAR(191) NULL,
    `option_image4` VARCHAR(191) NULL,
    `option_image5` VARCHAR(191) NULL,
    `option_point1` INTEGER NULL,
    `option_point2` INTEGER NULL,
    `option_point3` INTEGER NULL,
    `option_point4` INTEGER NULL,
    `option_point5` INTEGER NULL,
    `answer` VARCHAR(191) NOT NULL,
    `explanation` VARCHAR(191) NULL,
    `explanation_image1` VARCHAR(191) NULL,
    `explanation_image2` VARCHAR(191) NULL,
    `explanation_image3` VARCHAR(191) NULL,
    `explanation_image4` VARCHAR(191) NULL,
    `explanation_image5` VARCHAR(191) NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `soals_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `works` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `soal_id` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `result` BOOLEAN NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `works_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `results` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `today_works` INTEGER NOT NULL,
    `number_of_true` INTEGER NOT NULL,
    `number_of_false` INTEGER NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `results_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `packageTestUnits` ADD CONSTRAINT `packageTestUnits_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packageTestUnits` ADD CONSTRAINT `packageTestUnits_package_bundle_id_fkey` FOREIGN KEY (`package_bundle_id`) REFERENCES `packageBundles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packageBundles` ADD CONSTRAINT `packageBundles_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `candidates` ADD CONSTRAINT `candidates_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packageTestUnitWorks` ADD CONSTRAINT `packageTestUnitWorks_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packageTestUnitWorks` ADD CONSTRAINT `packageTestUnitWorks_package_bundle_id_fkey` FOREIGN KEY (`package_bundle_id`) REFERENCES `packageBundles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packageTestUnitWorks` ADD CONSTRAINT `packageTestUnitWorks_package_test_unit_id_fkey` FOREIGN KEY (`package_test_unit_id`) REFERENCES `packageTestUnits`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packageTestResults` ADD CONSTRAINT `packageTestResults_package_bundle_id_fkey` FOREIGN KEY (`package_bundle_id`) REFERENCES `packageBundles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packageTestResults` ADD CONSTRAINT `packageTestResults_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `candidates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `soals` ADD CONSTRAINT `soals_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `contributors`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `works` ADD CONSTRAINT `works_username_fkey` FOREIGN KEY (`username`) REFERENCES `students`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `works` ADD CONSTRAINT `works_soal_id_fkey` FOREIGN KEY (`soal_id`) REFERENCES `soals`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `results` ADD CONSTRAINT `results_username_fkey` FOREIGN KEY (`username`) REFERENCES `students`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;
