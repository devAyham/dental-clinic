/*
  Warnings:

  - You are about to drop the `teeths` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `paitent_id` on table `patients_costs` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `tight` to the `patients_diseases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `patients_costs` DROP FOREIGN KEY `patients_costs_paitent_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_teeth` DROP FOREIGN KEY `patients_teeth_teeth_id_fkey`;

-- AlterTable
ALTER TABLE `patients_badHabits` ADD COLUMN `notes` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `patients_costs` MODIFY `paitent_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `patients_diseases` ADD COLUMN `notes` VARCHAR(191) NULL,
    ADD COLUMN `tight` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `patients_medicines` ADD COLUMN `notes` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `teeths`;

-- CreateTable
CREATE TABLE `teeth` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patients_costs` ADD CONSTRAINT `patients_costs_paitent_id_fkey` FOREIGN KEY (`paitent_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_teeth` ADD CONSTRAINT `patients_teeth_teeth_id_fkey` FOREIGN KEY (`teeth_id`) REFERENCES `teeth`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
