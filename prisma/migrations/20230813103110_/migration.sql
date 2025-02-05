/*
  Warnings:

  - Added the required column `place` to the `diagnoses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `diagnoses` ADD COLUMN `place` VARCHAR(191) NOT NULL;
