-- CreateTable
CREATE TABLE `WorkingHours` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` ENUM('sun', 'mon', 'tue', 'wen', 'thr', 'fri', 'sat') NULL,
    `from` DATETIME(3) NOT NULL,
    `to` DATETIME(3) NOT NULL,
    `open` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `msg` VARCHAR(191) NOT NULL,
    `seen` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientAppointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `place` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `state` ENUM('registerd', 'unreegisterd') NOT NULL,
    `type` ENUM('normal', 'waiting', 'emergency', 'external') NOT NULL,
    `phase` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `patiient_appointment_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientReservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `notes` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientTreatment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `treatment_id` INTEGER NOT NULL,
    `place` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `type` ENUM('teethly', 'unteethly') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientTreatmentDoneStep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_treatment_id` INTEGER NOT NULL,
    `step_id` INTEGER NOT NULL,
    `patient_session_id` INTEGER NOT NULL,
    `note` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientLabOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_session_id` INTEGER NOT NULL,
    `lab_order_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientPerscrptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_session_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientPerscrptionsMedicince` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_perscrption_id` INTEGER NOT NULL,
    `medicince_id` INTEGER NOT NULL,
    `qantity` VARCHAR(191) NOT NULL,
    `repetition` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PatientAppointment` ADD CONSTRAINT `PatientAppointment_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientSession` ADD CONSTRAINT `PatientSession_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientSession` ADD CONSTRAINT `PatientSession_patiient_appointment_id_fkey` FOREIGN KEY (`patiient_appointment_id`) REFERENCES `PatientAppointment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientReservation` ADD CONSTRAINT `PatientReservation_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientTreatment` ADD CONSTRAINT `PatientTreatment_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientTreatment` ADD CONSTRAINT `PatientTreatment_treatment_id_fkey` FOREIGN KEY (`treatment_id`) REFERENCES `treatments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientTreatmentDoneStep` ADD CONSTRAINT `PatientTreatmentDoneStep_patient_treatment_id_fkey` FOREIGN KEY (`patient_treatment_id`) REFERENCES `PatientTreatment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientTreatmentDoneStep` ADD CONSTRAINT `PatientTreatmentDoneStep_step_id_fkey` FOREIGN KEY (`step_id`) REFERENCES `steps`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientTreatmentDoneStep` ADD CONSTRAINT `PatientTreatmentDoneStep_patient_session_id_fkey` FOREIGN KEY (`patient_session_id`) REFERENCES `PatientSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientLabOrder` ADD CONSTRAINT `PatientLabOrder_patient_session_id_fkey` FOREIGN KEY (`patient_session_id`) REFERENCES `PatientSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientPerscrptions` ADD CONSTRAINT `PatientPerscrptions_patient_session_id_fkey` FOREIGN KEY (`patient_session_id`) REFERENCES `PatientSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientPerscrptionsMedicince` ADD CONSTRAINT `PatientPerscrptionsMedicince_patient_perscrption_id_fkey` FOREIGN KEY (`patient_perscrption_id`) REFERENCES `PatientPerscrptions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientPerscrptionsMedicince` ADD CONSTRAINT `PatientPerscrptionsMedicince_medicince_id_fkey` FOREIGN KEY (`medicince_id`) REFERENCES `medicines`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
