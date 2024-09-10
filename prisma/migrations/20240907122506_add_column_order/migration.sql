-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(191) NOT NULL,
    `student_id` VARCHAR(191) NULL,
    `qty` INTEGER NOT NULL DEFAULT 0,
    `price` INTEGER NOT NULL DEFAULT 2000,
    `discount` DOUBLE NOT NULL DEFAULT 0,
    `sub_total` INTEGER NOT NULL,
    `order_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `payment_date` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Process',

    UNIQUE INDEX `orders_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
