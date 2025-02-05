/*
  Warnings:

  - You are about to drop the column `data` on the `patients_payments` table. All the data in the column will be lost.
  - You are about to drop the column `treatment_Id` on the `patients_payments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `patients_payments` DROP FOREIGN KEY `patients_payments_treatment_Id_fkey`;

-- AlterTable
ALTER TABLE `patients_payments` DROP COLUMN `data`,
    DROP COLUMN `treatment_Id`,
    ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
