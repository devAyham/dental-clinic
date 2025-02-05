/*
  Warnings:

  - Added the required column `deliver_at` to the `PatientLabOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PatientLabOrder` ADD COLUMN `deliver_at` DATETIME(3) NOT NULL;
