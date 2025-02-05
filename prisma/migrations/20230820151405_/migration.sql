/*
  Warnings:

  - Added the required column `lab_id` to the `LabOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_id` to the `PatientLabOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `LabOrder` ADD COLUMN `lab_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PatientLabOrder` ADD COLUMN `patient_id` INTEGER NOT NULL,
    MODIFY `patient_session_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `Lab` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PatientLabOrder` ADD CONSTRAINT `PatientLabOrder_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LabOrder` ADD CONSTRAINT `LabOrder_lab_id_fkey` FOREIGN KEY (`lab_id`) REFERENCES `Lab`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
