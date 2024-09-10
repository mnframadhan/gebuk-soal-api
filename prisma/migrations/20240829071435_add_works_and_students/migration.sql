-- CreateTable
CREATE TABLE `students` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL DEFAULT 0,
    `number_of_soal_tiu_kata` INTEGER NOT NULL DEFAULT 0,
    `created_at` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NULL,

    UNIQUE INDEX `students_id_key`(`id`),
    UNIQUE INDEX `students_username_key`(`username`),
    UNIQUE INDEX `students_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `works` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `soal_tiu_kata_id` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `result` BOOLEAN NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `works_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Results` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `soal_tiu_kata_true` INTEGER NOT NULL,
    `soal_tiu_kata_false` INTEGER NOT NULL,

    UNIQUE INDEX `Results_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `works` ADD CONSTRAINT `works_username_fkey` FOREIGN KEY (`username`) REFERENCES `students`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `works` ADD CONSTRAINT `works_soal_tiu_kata_id_fkey` FOREIGN KEY (`soal_tiu_kata_id`) REFERENCES `soalTIUkata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Results` ADD CONSTRAINT `Results_username_fkey` FOREIGN KEY (`username`) REFERENCES `students`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
