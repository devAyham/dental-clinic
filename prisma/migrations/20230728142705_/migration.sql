/*
  Warnings:

  - You are about to drop the `Diagnose` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicalImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicalImageType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PatientBadHabet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PatientCost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PatientDisease` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PatientMedicine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PatientPayment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patientTeethTreatment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teeth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Diagnose` DROP FOREIGN KEY `Diagnose_paitent_id_fkey`;

-- DropForeignKey
ALTER TABLE `Diagnose` DROP FOREIGN KEY `Diagnose_problem_id_fkey`;

-- DropForeignKey
ALTER TABLE `MedicalImage` DROP FOREIGN KEY `MedicalImage_medical_image_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `PatientBadHabet` DROP FOREIGN KEY `PatientBadHabet_bad_habet_id_fkey`;

-- DropForeignKey
ALTER TABLE `PatientBadHabet` DROP FOREIGN KEY `PatientBadHabet_paitent_id_fkey`;

-- DropForeignKey
ALTER TABLE `PatientCost` DROP FOREIGN KEY `PatientCost_paitent_id_fkey`;

-- DropForeignKey
ALTER TABLE `PatientCost` DROP FOREIGN KEY `PatientCost_treatment_id_fkey`;

-- DropForeignKey
ALTER TABLE `PatientDisease` DROP FOREIGN KEY `PatientDisease_disease_id_fkey`;

-- DropForeignKey
ALTER TABLE `PatientDisease` DROP FOREIGN KEY `PatientDisease_paitent_id_fkey`;

-- DropForeignKey
ALTER TABLE `PatientMedicine` DROP FOREIGN KEY `PatientMedicine_medicine_id_fkey`;

-- DropForeignKey
ALTER TABLE `PatientMedicine` DROP FOREIGN KEY `PatientMedicine_paitent_id_fkey`;

-- DropForeignKey
ALTER TABLE `PatientPayment` DROP FOREIGN KEY `PatientPayment_paitent_id_fkey`;

-- DropForeignKey
ALTER TABLE `PatientPayment` DROP FOREIGN KEY `PatientPayment_treatment_Id_fkey`;

-- DropForeignKey
ALTER TABLE `patientTeethTreatment` DROP FOREIGN KEY `patientTeethTreatment_paitent_id_fkey`;

-- DropForeignKey
ALTER TABLE `patientTeethTreatment` DROP FOREIGN KEY `patientTeethTreatment_teeth_id_fkey`;

-- DropForeignKey
ALTER TABLE `patientTeethTreatment` DROP FOREIGN KEY `patientTeethTreatment_treatment_Id_fkey`;

-- DropTable
DROP TABLE `Diagnose`;

-- DropTable
DROP TABLE `MedicalImage`;

-- DropTable
DROP TABLE `MedicalImageType`;

-- DropTable
DROP TABLE `PatientBadHabet`;

-- DropTable
DROP TABLE `PatientCost`;

-- DropTable
DROP TABLE `PatientDisease`;

-- DropTable
DROP TABLE `PatientMedicine`;

-- DropTable
DROP TABLE `PatientPayment`;

-- DropTable
DROP TABLE `patientTeethTreatment`;

-- DropTable
DROP TABLE `teeth`;

-- CreateTable
CREATE TABLE `patients_diseases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paitent_id` INTEGER NOT NULL,
    `disease_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients_badHabits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bad_habet_id` INTEGER NOT NULL,
    `paitent_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients_medicines` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medicine_id` INTEGER NOT NULL,
    `paitent_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medical_images_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medical_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `src` VARCHAR(191) NOT NULL,
    `medical_image_type_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients_costs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `description` VARCHAR(191) NULL,
    `treatment_id` INTEGER NULL,
    `paitent_id` INTEGER NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients_payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `description` VARCHAR(191) NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `paitent_id` INTEGER NOT NULL,
    `treatment_Id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diagnoses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paitent_id` INTEGER NOT NULL,
    `problem_id` INTEGER NOT NULL,
    `expected_treatment` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teeths` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients_teeth` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paitent_id` INTEGER NOT NULL,
    `teeth_id` INTEGER NOT NULL,
    `treatment_Id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patients_diseases` ADD CONSTRAINT `patients_diseases_paitent_id_fkey` FOREIGN KEY (`paitent_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_diseases` ADD CONSTRAINT `patients_diseases_disease_id_fkey` FOREIGN KEY (`disease_id`) REFERENCES `diseases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_badHabits` ADD CONSTRAINT `patients_badHabits_paitent_id_fkey` FOREIGN KEY (`paitent_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_badHabits` ADD CONSTRAINT `patients_badHabits_bad_habet_id_fkey` FOREIGN KEY (`bad_habet_id`) REFERENCES `bad_habit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_medicines` ADD CONSTRAINT `patients_medicines_paitent_id_fkey` FOREIGN KEY (`paitent_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_medicines` ADD CONSTRAINT `patients_medicines_medicine_id_fkey` FOREIGN KEY (`medicine_id`) REFERENCES `medicines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medical_images` ADD CONSTRAINT `medical_images_medical_image_type_id_fkey` FOREIGN KEY (`medical_image_type_id`) REFERENCES `medical_images_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_costs` ADD CONSTRAINT `patients_costs_paitent_id_fkey` FOREIGN KEY (`paitent_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_costs` ADD CONSTRAINT `patients_costs_treatment_id_fkey` FOREIGN KEY (`treatment_id`) REFERENCES `treatments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_payments` ADD CONSTRAINT `patients_payments_paitent_id_fkey` FOREIGN KEY (`paitent_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_payments` ADD CONSTRAINT `patients_payments_treatment_Id_fkey` FOREIGN KEY (`treatment_Id`) REFERENCES `treatments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diagnoses` ADD CONSTRAINT `diagnoses_paitent_id_fkey` FOREIGN KEY (`paitent_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diagnoses` ADD CONSTRAINT `diagnoses_problem_id_fkey` FOREIGN KEY (`problem_id`) REFERENCES `problems`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_teeth` ADD CONSTRAINT `patients_teeth_paitent_id_fkey` FOREIGN KEY (`paitent_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_teeth` ADD CONSTRAINT `patients_teeth_treatment_Id_fkey` FOREIGN KEY (`treatment_Id`) REFERENCES `treatments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_teeth` ADD CONSTRAINT `patients_teeth_teeth_id_fkey` FOREIGN KEY (`teeth_id`) REFERENCES `teeths`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
