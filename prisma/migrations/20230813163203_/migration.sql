-- AlterTable
ALTER TABLE `patients_badHabits` ADD COLUMN `start_date` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `patients_diseases` ADD COLUMN `start_date` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `patients_medicines` ADD COLUMN `start_date` DATETIME(3) NULL;
