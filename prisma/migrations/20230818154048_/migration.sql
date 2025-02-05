/*
  Warnings:

  - Made the column `day` on table `WorkingHours` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `WorkingHours` MODIFY `day` ENUM('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat') NOT NULL;
