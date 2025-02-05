/*
  Warnings:

  - You are about to drop the column `data` on the `patients_costs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patients_costs` DROP COLUMN `data`,
    ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
