/*
  Warnings:

  - A unique constraint covering the columns `[day]` on the table `WorkingHours` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `WorkingHours_day_key` ON `WorkingHours`(`day`);
