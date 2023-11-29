/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Demander` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Demander` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Demander` ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `DemanderProduct` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Supplier` ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SupplierProduct` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `Demander_email_key` ON `Demander`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Supplier_email_key` ON `Supplier`(`email`);
