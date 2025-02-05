/*
  Warnings:

  - You are about to drop the column `paitent_id` on the `diagnoses` table. All the data in the column will be lost.
  - You are about to drop the column `paitent_id` on the `patients_badHabits` table. All the data in the column will be lost.
  - You are about to drop the column `paitent_id` on the `patients_costs` table. All the data in the column will be lost.
  - You are about to drop the column `paitent_id` on the `patients_diseases` table. All the data in the column will be lost.
  - You are about to drop the column `paitent_id` on the `patients_medicines` table. All the data in the column will be lost.
  - You are about to drop the column `paitent_id` on the `patients_payments` table. All the data in the column will be lost.
  - You are about to drop the column `paitent_id` on the `patients_teeth` table. All the data in the column will be lost.
  - Added the required column `patient_id` to the `diagnoses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_id` to the `patients_badHabits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_id` to the `patients_costs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_id` to the `patients_diseases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_id` to the `patients_medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_id` to the `patients_payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_id` to the `patients_teeth` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `diagnoses` DROP FOREIGN KEY `diagnoses_paitent_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_badHabits` DROP FOREIGN KEY `patients_badHabits_paitent_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_costs` DROP FOREIGN KEY `patients_costs_paitent_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_diseases` DROP FOREIGN KEY `patients_diseases_paitent_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_medicines` DROP FOREIGN KEY `patients_medicines_paitent_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_payments` DROP FOREIGN KEY `patients_payments_paitent_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_teeth` DROP FOREIGN KEY `patients_teeth_paitent_id_fkey`;

-- AlterTable
ALTER TABLE `diagnoses` DROP COLUMN `paitent_id`,
    ADD COLUMN `patient_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `patients_badHabits` DROP COLUMN `paitent_id`,
    ADD COLUMN `patient_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `patients_costs` DROP COLUMN `paitent_id`,
    ADD COLUMN `patient_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `patients_diseases` DROP COLUMN `paitent_id`,
    ADD COLUMN `patient_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `patients_medicines` DROP COLUMN `paitent_id`,
    ADD COLUMN `patient_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `patients_payments` DROP COLUMN `paitent_id`,
    ADD COLUMN `patient_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `patients_teeth` DROP COLUMN `paitent_id`,
    ADD COLUMN `patient_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `patients_diseases` ADD CONSTRAINT `patients_diseases_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_badHabits` ADD CONSTRAINT `patients_badHabits_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_medicines` ADD CONSTRAINT `patients_medicines_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_costs` ADD CONSTRAINT `patients_costs_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_payments` ADD CONSTRAINT `patients_payments_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diagnoses` ADD CONSTRAINT `diagnoses_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_teeth` ADD CONSTRAINT `patients_teeth_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
