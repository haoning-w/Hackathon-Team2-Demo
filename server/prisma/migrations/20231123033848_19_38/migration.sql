/*
  Warnings:

  - You are about to drop the column `cumulativeAmount` on the `DemanderProduct` table. All the data in the column will be lost.
  - You are about to drop the column `productType` on the `DemanderProduct` table. All the data in the column will be lost.
  - You are about to drop the column `cumulativeAmount` on the `SupplierProduct` table. All the data in the column will be lost.
  - You are about to drop the column `productType` on the `SupplierProduct` table. All the data in the column will be lost.
  - Added the required column `historicalQuantity` to the `DemanderProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `DemanderProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `historicalQuantity` to the `SupplierProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `SupplierProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DemanderProduct` DROP COLUMN `cumulativeAmount`,
    DROP COLUMN `productType`,
    ADD COLUMN `historicalQuantity` DOUBLE NOT NULL,
    ADD COLUMN `productName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SupplierProduct` DROP COLUMN `cumulativeAmount`,
    DROP COLUMN `productType`,
    ADD COLUMN `historicalQuantity` DOUBLE NOT NULL,
    ADD COLUMN `productName` VARCHAR(191) NOT NULL;
