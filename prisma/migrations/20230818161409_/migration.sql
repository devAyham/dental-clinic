/*
  Warnings:

  - Added the required column `status` to the `PatientTreatment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PatientTreatment` ADD COLUMN `status` ENUM('done', 'ongoing') NOT NULL;
