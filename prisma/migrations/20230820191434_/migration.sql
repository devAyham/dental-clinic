/*
  Warnings:

  - Added the required column `created_at` to the `PatientLabOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `degree` to the `PatientLabOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `directions` to the `PatientLabOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `PatientLabOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PatientLabOrder` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `degree` VARCHAR(191) NOT NULL,
    ADD COLUMN `directions` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Notation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notation` VARCHAR(191) NOT NULL,
    `patient_lab_order_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notation` ADD CONSTRAINT `Notation_patient_lab_order_id_fkey` FOREIGN KEY (`patient_lab_order_id`) REFERENCES `PatientLabOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
