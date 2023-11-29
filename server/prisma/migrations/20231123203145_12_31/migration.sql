/*
  Warnings:

  - You are about to drop the column `demanderName` on the `Demander` table. All the data in the column will be lost.
  - Added the required column `organizationName` to the `Demander` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Demander` DROP COLUMN `demanderName`,
    ADD COLUMN `organizationName` VARCHAR(191) NOT NULL;
