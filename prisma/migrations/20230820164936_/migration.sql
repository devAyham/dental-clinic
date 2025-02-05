/*
  Warnings:

  - You are about to drop the `Lab_order_steps` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lab_orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Labs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Lab_order_steps` DROP FOREIGN KEY `Lab_order_steps_lab_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `Lab_orders` DROP FOREIGN KEY `Lab_orders_lab_id_fkey`;

-- DropForeignKey
ALTER TABLE `PatientLabOrder` DROP FOREIGN KEY `PatientLabOrder_lab_order_id_fkey`;

-- DropTable
DROP TABLE `Lab_order_steps`;

-- DropTable
DROP TABLE `Lab_orders`;

-- DropTable
DROP TABLE `Labs`;

-- CreateTable
CREATE TABLE `labs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lab_orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `lab_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lab_order_steps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `lab_order_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PatientLabOrder` ADD CONSTRAINT `PatientLabOrder_lab_order_id_fkey` FOREIGN KEY (`lab_order_id`) REFERENCES `lab_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lab_orders` ADD CONSTRAINT `lab_orders_lab_id_fkey` FOREIGN KEY (`lab_id`) REFERENCES `labs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lab_order_steps` ADD CONSTRAINT `lab_order_steps_lab_order_id_fkey` FOREIGN KEY (`lab_order_id`) REFERENCES `lab_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
