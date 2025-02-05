/*
  Warnings:

  - The values [unreegisterd] on the enum `PatientAppointment_state` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `PatientAppointment` MODIFY `place` VARCHAR(191) NULL,
    MODIFY `state` ENUM('registerd', 'unregisterd') NOT NULL;
