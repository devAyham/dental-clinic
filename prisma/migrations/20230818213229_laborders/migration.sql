-- CreateTable
CREATE TABLE `LabOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PatientLabOrder` ADD CONSTRAINT `PatientLabOrder_lab_order_id_fkey` FOREIGN KEY (`lab_order_id`) REFERENCES `LabOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
