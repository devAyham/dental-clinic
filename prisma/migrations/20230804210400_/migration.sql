/*
  Warnings:

  - You are about to drop the column `patinet_id` on the `medical_images` table. All the data in the column will be lost.
  - Added the required column `patient_id` to the `medical_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `medical_images` DROP FOREIGN KEY `medical_images_patinet_id_fkey`;

-- AlterTable
ALTER TABLE `medical_images` DROP COLUMN `patinet_id`,
    ADD COLUMN `patient_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `medical_images` ADD CONSTRAINT `medical_images_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
