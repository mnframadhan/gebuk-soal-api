-- CreateTable
CREATE TABLE `contributors` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `contribution_points` INTEGER NOT NULL,
    `number_of_soal` INTEGER NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `contributors_id_key`(`id`),
    UNIQUE INDEX `contributors_username_key`(`username`),
    UNIQUE INDEX `contributors_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `soalTIUkata` (
    `id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `option1` VARCHAR(191) NOT NULL,
    `option2` VARCHAR(191) NOT NULL,
    `option3` VARCHAR(191) NOT NULL,
    `option4` VARCHAR(191) NOT NULL,
    `option5` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `explanation` VARCHAR(191) NOT NULL DEFAULT '',
    `created_by` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `soalTIUkata_id_key`(`id`),
    UNIQUE INDEX `soalTIUkata_question_key`(`question`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `soalTIUkata` ADD CONSTRAINT `soalTIUkata_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `contributors`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
