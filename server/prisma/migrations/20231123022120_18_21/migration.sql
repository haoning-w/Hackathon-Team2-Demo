/*
  Warnings:

  - You are about to drop the column `cumulative_amount` on the `Demander` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Demander` table. All the data in the column will be lost.
  - You are about to drop the column `type_id` on the `Demander` table. All the data in the column will be lost.
  - You are about to drop the column `cumulative_amount` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `organization_name` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `type_id` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Volunteer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Demander` table without a default value. This is not possible if the table is not empty.
  - Added the required column `demanderName` to the `Demander` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationName` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_supplier_id_fkey`;

-- AlterTable
ALTER TABLE `Demander` DROP COLUMN `cumulative_amount`,
    DROP COLUMN `last_name`,
    DROP COLUMN `type_id`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `demanderName` VARCHAR(191) NOT NULL,
    ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitude` DOUBLE NULL,
    ADD COLUMN `userType` VARCHAR(191) NOT NULL DEFAULT 'd';

-- AlterTable
ALTER TABLE `Supplier` DROP COLUMN `cumulative_amount`,
    DROP COLUMN `organization_name`,
    DROP COLUMN `product_id`,
    DROP COLUMN `type_id`,
    ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitude` DOUBLE NULL,
    ADD COLUMN `organizationName` VARCHAR(191) NOT NULL,
    ADD COLUMN `userType` VARCHAR(191) NOT NULL DEFAULT 's';

-- DropTable
DROP TABLE `Product`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `Volunteer`;

-- CreateTable
CREATE TABLE `SupplierProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productType` VARCHAR(191) NOT NULL,
    `unitPrice` DOUBLE NOT NULL,
    `totalPrice` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `cumulativeAmount` DOUBLE NOT NULL,
    `supplierId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DemanderProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productType` VARCHAR(191) NOT NULL,
    `unitPrice` DOUBLE NOT NULL,
    `totalPrice` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `cumulativeAmount` DOUBLE NOT NULL,
    `demanderId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SupplierProduct` ADD CONSTRAINT `SupplierProduct_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DemanderProduct` ADD CONSTRAINT `DemanderProduct_demanderId_fkey` FOREIGN KEY (`demanderId`) REFERENCES `Demander`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
