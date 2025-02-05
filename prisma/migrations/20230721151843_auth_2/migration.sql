/*
  Warnings:

  - You are about to drop the column `hasedRefreshToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `hasedRefreshToken`,
    ADD COLUMN `hashedRefreshToken` VARCHAR(191) NULL;
