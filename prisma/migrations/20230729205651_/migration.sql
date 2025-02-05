/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `bad_habits_chemical_materials` DROP FOREIGN KEY `bad_habits_chemical_materials_bad_habit_id_fkey`;

-- DropForeignKey
ALTER TABLE `bad_habits_chemical_materials` DROP FOREIGN KEY `bad_habits_chemical_materials_chemical_material_id_fkey`;

-- DropForeignKey
ALTER TABLE `chemical_materials_chemical_materials` DROP FOREIGN KEY `chemical_materials_chemical_materials_chemical_material_1_i_fkey`;

-- DropForeignKey
ALTER TABLE `chemical_materials_chemical_materials` DROP FOREIGN KEY `chemical_materials_chemical_materials_chemical_material_2_i_fkey`;

-- DropForeignKey
ALTER TABLE `diseases_chemical_materials` DROP FOREIGN KEY `diseases_chemical_materials_chemical_material_id_fkey`;

-- DropForeignKey
ALTER TABLE `diseases_chemical_materials` DROP FOREIGN KEY `diseases_chemical_materials_disease_id_fkey`;

-- DropForeignKey
ALTER TABLE `medicines` DROP FOREIGN KEY `medicines_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `medicines_chemical_materials` DROP FOREIGN KEY `medicines_chemical_materials_chemical_material_id_fkey`;

-- DropForeignKey
ALTER TABLE `medicines_chemical_materials` DROP FOREIGN KEY `medicines_chemical_materials_medicine_id_fkey`;

-- DropForeignKey
ALTER TABLE `problems` DROP FOREIGN KEY `problems_problem_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `steps` DROP FOREIGN KEY `steps_treatment_id_fkey`;

-- DropForeignKey
ALTER TABLE `subs_step` DROP FOREIGN KEY `subs_step_step_id_fkey`;

-- DropForeignKey
ALTER TABLE `treatments` DROP FOREIGN KEY `treatments_treatment_type_id_fkey`;

-- DropTable
DROP TABLE `Category`;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `diseases_chemical_materials` ADD CONSTRAINT `diseases_chemical_materials_disease_id_fkey` FOREIGN KEY (`disease_id`) REFERENCES `diseases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diseases_chemical_materials` ADD CONSTRAINT `diseases_chemical_materials_chemical_material_id_fkey` FOREIGN KEY (`chemical_material_id`) REFERENCES `chemical_materials`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bad_habits_chemical_materials` ADD CONSTRAINT `bad_habits_chemical_materials_bad_habit_id_fkey` FOREIGN KEY (`bad_habit_id`) REFERENCES `bad_habit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bad_habits_chemical_materials` ADD CONSTRAINT `bad_habits_chemical_materials_chemical_material_id_fkey` FOREIGN KEY (`chemical_material_id`) REFERENCES `chemical_materials`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chemical_materials_chemical_materials` ADD CONSTRAINT `chemical_materials_chemical_materials_chemical_material_1_i_fkey` FOREIGN KEY (`chemical_material_1_id`) REFERENCES `chemical_materials`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chemical_materials_chemical_materials` ADD CONSTRAINT `chemical_materials_chemical_materials_chemical_material_2_i_fkey` FOREIGN KEY (`chemical_material_2_id`) REFERENCES `chemical_materials`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medicines` ADD CONSTRAINT `medicines_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medicines_chemical_materials` ADD CONSTRAINT `medicines_chemical_materials_medicine_id_fkey` FOREIGN KEY (`medicine_id`) REFERENCES `medicines`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medicines_chemical_materials` ADD CONSTRAINT `medicines_chemical_materials_chemical_material_id_fkey` FOREIGN KEY (`chemical_material_id`) REFERENCES `chemical_materials`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `treatments` ADD CONSTRAINT `treatments_treatment_type_id_fkey` FOREIGN KEY (`treatment_type_id`) REFERENCES `treatments_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `steps` ADD CONSTRAINT `steps_treatment_id_fkey` FOREIGN KEY (`treatment_id`) REFERENCES `treatments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subs_step` ADD CONSTRAINT `subs_step_step_id_fkey` FOREIGN KEY (`step_id`) REFERENCES `steps`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `problems` ADD CONSTRAINT `problems_problem_type_id_fkey` FOREIGN KEY (`problem_type_id`) REFERENCES `problem_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
