/*
  Warnings:

  - The values [sun,mon,tue,wen,thr,fri,sat] on the enum `WorkingHours_day` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `WorkingHours` MODIFY `day` ENUM('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat') NULL;
