/*
  Warnings:

  - Added the required column `price` to the `lab_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lab_orders` ADD COLUMN `price` VARCHAR(191) NOT NULL;
