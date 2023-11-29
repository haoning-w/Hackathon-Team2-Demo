-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `type_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organization_name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `type_id` INTEGER NOT NULL DEFAULT 1,
    `product_id` INTEGER NOT NULL,
    `cumulative_amount` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supplier_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `amount` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Volunteer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `demander_name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `cumulative_amount` DOUBLE NOT NULL,
    `type_id` INTEGER NOT NULL DEFAULT 3,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Demander` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `last_name` VARCHAR(191) NOT NULL,
    `cumulative_amount` DOUBLE NOT NULL,
    `type_id` INTEGER NOT NULL DEFAULT 2,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `Supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
