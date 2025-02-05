/*
  Warnings:

  - You are about to drop the column `Job` on the `patients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patients` DROP COLUMN `Job`,
    ADD COLUMN `job` VARCHAR(191) NULL;
