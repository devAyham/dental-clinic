/*
  Warnings:

  - You are about to drop the column `birthdate` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `main_status` on the `patients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patients` DROP COLUMN `birthdate`,
    DROP COLUMN `main_status`,
    ADD COLUMN `birth_date` DATETIME(3) NULL,
    ADD COLUMN `maintal_status` VARCHAR(191) NULL;
