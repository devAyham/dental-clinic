-- DropForeignKey
ALTER TABLE `diagnoses` DROP FOREIGN KEY `diagnoses_patient_id_fkey`;

-- DropForeignKey
ALTER TABLE `diagnoses` DROP FOREIGN KEY `diagnoses_problem_id_fkey`;

-- DropForeignKey
ALTER TABLE `medical_images` DROP FOREIGN KEY `medical_images_medical_image_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `medical_images` DROP FOREIGN KEY `medical_images_patient_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_badHabits` DROP FOREIGN KEY `patients_badHabits_bad_habet_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_badHabits` DROP FOREIGN KEY `patients_badHabits_patient_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_diseases` DROP FOREIGN KEY `patients_diseases_disease_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_diseases` DROP FOREIGN KEY `patients_diseases_patient_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_medicines` DROP FOREIGN KEY `patients_medicines_medicine_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_medicines` DROP FOREIGN KEY `patients_medicines_patient_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_payments` DROP FOREIGN KEY `patients_payments_patient_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_teeth` DROP FOREIGN KEY `patients_teeth_patient_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_teeth` DROP FOREIGN KEY `patients_teeth_teeth_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients_teeth` DROP FOREIGN KEY `patients_teeth_treatment_Id_fkey`;

-- AddForeignKey
ALTER TABLE `patients_diseases` ADD CONSTRAINT `patients_diseases_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_diseases` ADD CONSTRAINT `patients_diseases_disease_id_fkey` FOREIGN KEY (`disease_id`) REFERENCES `diseases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_badHabits` ADD CONSTRAINT `patients_badHabits_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_badHabits` ADD CONSTRAINT `patients_badHabits_bad_habet_id_fkey` FOREIGN KEY (`bad_habet_id`) REFERENCES `bad_habit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_medicines` ADD CONSTRAINT `patients_medicines_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_medicines` ADD CONSTRAINT `patients_medicines_medicine_id_fkey` FOREIGN KEY (`medicine_id`) REFERENCES `medicines`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medical_images` ADD CONSTRAINT `medical_images_medical_image_type_id_fkey` FOREIGN KEY (`medical_image_type_id`) REFERENCES `medical_images_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medical_images` ADD CONSTRAINT `medical_images_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_payments` ADD CONSTRAINT `patients_payments_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diagnoses` ADD CONSTRAINT `diagnoses_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diagnoses` ADD CONSTRAINT `diagnoses_problem_id_fkey` FOREIGN KEY (`problem_id`) REFERENCES `problems`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_teeth` ADD CONSTRAINT `patients_teeth_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_teeth` ADD CONSTRAINT `patients_teeth_treatment_Id_fkey` FOREIGN KEY (`treatment_Id`) REFERENCES `treatments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_teeth` ADD CONSTRAINT `patients_teeth_teeth_id_fkey` FOREIGN KEY (`teeth_id`) REFERENCES `teeth`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
