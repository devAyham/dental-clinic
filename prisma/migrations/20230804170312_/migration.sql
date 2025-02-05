/*
  Warnings:

  - Added the required column `patinet_id` to the `medical_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `medical_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medical_images` ADD COLUMN `patinet_id` INTEGER NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `medical_images` ADD CONSTRAINT `medical_images_patinet_id_fkey` FOREIGN KEY (`patinet_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
