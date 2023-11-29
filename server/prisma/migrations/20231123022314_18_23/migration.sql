/*
  Warnings:

  - You are about to drop the column `latitude` on the `Demander` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Demander` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Supplier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Demander` DROP COLUMN `latitude`,
    DROP COLUMN `longitude`;

-- AlterTable
ALTER TABLE `Supplier` DROP COLUMN `latitude`,
    DROP COLUMN `longitude`;
