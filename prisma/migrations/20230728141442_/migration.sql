-- CreateTable
CREATE TABLE `patients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `phone` VARCHAR(191) NULL,
    `birthdate` DATETIME(3) NULL,
    `Job` VARCHAR(191) NULL,
    `main_complaint` VARCHAR(191) NULL,
    `main_status` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientDisease` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paitent_id` INTEGER NOT NULL,
    `disease_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientBadHabet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bad_habet_id` INTEGER NOT NULL,
    `paitent_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientMedicine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medicine_id` INTEGER NOT NULL,
    `paitent_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedicalImageType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedicalImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `src` VARCHAR(191) NOT NULL,
    `medical_image_type_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientCost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `description` VARCHAR(191) NULL,
    `treatment_id` INTEGER NULL,
    `paitent_id` INTEGER NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientPayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `description` VARCHAR(191) NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `paitent_id` INTEGER NOT NULL,
    `treatment_Id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Diagnose` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paitent_id` INTEGER NOT NULL,
    `problem_id` INTEGER NOT NULL,
    `expected_treatment` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teeth` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patientTeethTreatment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paitent_id` INTEGER NOT NULL,
    `teeth_id` INTEGER NOT NULL,
    `treatment_Id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PatientDisease` ADD CONSTRAINT `PatientDisease_paitent_id_fkey` FOREIGN KEY (`paitent_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientDisease` ADD CONSTRAINT `PatientDisease_disease_id_fkey` FOREIGN KEY (`disease_id`) REFERENCES `diseases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientBadHabet` ADD CONSTRAINT `PatientBadHabet_paitent_id_fkey` FOREIGN KEY (`paitent_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientBadHabet` ADD CONSTRAINT `PatientBadHabet_bad_habet_id_fkey` FOREIGN KEY (`bad_habet_id`) REFERENCES `bad_habit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientMedicine` ADD CONSTRAINT `PatientMedicine_paitent_id_fkey` FOREIGN KEY (`paitent_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientMedicine` ADD CONSTRAINT `PatientMedicine_medicine_id_fkey` FOREIGN KEY (`medicine_id`) REFERENCES `medicines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalImage` ADD CONSTRAINT `MedicalImage_medical_image_type_id_fkey` FOREIGN KEY (`medical_image_type_id`) REFERENCES `MedicalImageType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientCost` ADD CONSTRAINT `PatientCost_paitent_id_fkey` FOREIGN KEY (`paitent_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientCost` ADD CONSTRAINT `PatientCost_treatment_id_fkey` FOREIGN KEY (`treatment_id`) REFERENCES `treatments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientPayment` ADD CONSTRAINT `PatientPayment_paitent_id_fkey` FOREIGN KEY (`paitent_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientPayment` ADD CONSTRAINT `PatientPayment_treatment_Id_fkey` FOREIGN KEY (`treatment_Id`) REFERENCES `treatments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diagnose` ADD CONSTRAINT `Diagnose_paitent_id_fkey` FOREIGN KEY (`paitent_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diagnose` ADD CONSTRAINT `Diagnose_problem_id_fkey` FOREIGN KEY (`problem_id`) REFERENCES `problems`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patientTeethTreatment` ADD CONSTRAINT `patientTeethTreatment_paitent_id_fkey` FOREIGN KEY (`paitent_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patientTeethTreatment` ADD CONSTRAINT `patientTeethTreatment_treatment_Id_fkey` FOREIGN KEY (`treatment_Id`) REFERENCES `treatments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patientTeethTreatment` ADD CONSTRAINT `patientTeethTreatment_teeth_id_fkey` FOREIGN KEY (`teeth_id`) REFERENCES `teeth`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
