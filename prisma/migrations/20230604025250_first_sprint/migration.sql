-- CreateTable
CREATE TABLE `chemical_materials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diseases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bad_habit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diseases_chemical_materials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chemical_material_id` INTEGER NOT NULL,
    `disease_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bad_habits_chemical_materials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chemical_material_id` INTEGER NOT NULL,
    `bad_habit_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chemical_materials_chemical_materials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chemical_material_1_id` INTEGER NOT NULL,
    `chemical_material_2_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicines` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicines_chemical_materials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chemical_material_id` INTEGER NOT NULL,
    `medicine_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `treatments_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `treatments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `treatment_type_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `steps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `treatment_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subs_step` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `step_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `problem_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `problems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `Problem_type_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `diseases_chemical_materials` ADD CONSTRAINT `diseases_chemical_materials_disease_id_fkey` FOREIGN KEY (`disease_id`) REFERENCES `diseases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diseases_chemical_materials` ADD CONSTRAINT `diseases_chemical_materials_chemical_material_id_fkey` FOREIGN KEY (`chemical_material_id`) REFERENCES `chemical_materials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bad_habits_chemical_materials` ADD CONSTRAINT `bad_habits_chemical_materials_bad_habit_id_fkey` FOREIGN KEY (`bad_habit_id`) REFERENCES `bad_habit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bad_habits_chemical_materials` ADD CONSTRAINT `bad_habits_chemical_materials_chemical_material_id_fkey` FOREIGN KEY (`chemical_material_id`) REFERENCES `chemical_materials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chemical_materials_chemical_materials` ADD CONSTRAINT `chemical_materials_chemical_materials_chemical_material_1_i_fkey` FOREIGN KEY (`chemical_material_1_id`) REFERENCES `chemical_materials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chemical_materials_chemical_materials` ADD CONSTRAINT `chemical_materials_chemical_materials_chemical_material_2_i_fkey` FOREIGN KEY (`chemical_material_2_id`) REFERENCES `chemical_materials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medicines_chemical_materials` ADD CONSTRAINT `medicines_chemical_materials_medicine_id_fkey` FOREIGN KEY (`medicine_id`) REFERENCES `medicines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medicines_chemical_materials` ADD CONSTRAINT `medicines_chemical_materials_chemical_material_id_fkey` FOREIGN KEY (`chemical_material_id`) REFERENCES `chemical_materials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `treatments` ADD CONSTRAINT `treatments_treatment_type_id_fkey` FOREIGN KEY (`treatment_type_id`) REFERENCES `treatments_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `steps` ADD CONSTRAINT `steps_treatment_id_fkey` FOREIGN KEY (`treatment_id`) REFERENCES `treatments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subs_step` ADD CONSTRAINT `subs_step_step_id_fkey` FOREIGN KEY (`step_id`) REFERENCES `steps`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `problems` ADD CONSTRAINT `problems_Problem_type_id_fkey` FOREIGN KEY (`Problem_type_id`) REFERENCES `problem_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
