/*
  Warnings:

  - You are about to drop the column `Problem_type_id` on the `problems` table. All the data in the column will be lost.
  - Added the required column `problem_type_id` to the `problems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `problems` DROP FOREIGN KEY `problems_Problem_type_id_fkey`;

-- AlterTable
ALTER TABLE `problems` DROP COLUMN `Problem_type_id`,
    ADD COLUMN `problem_type_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `problems` ADD CONSTRAINT `problems_problem_type_id_fkey` FOREIGN KEY (`problem_type_id`) REFERENCES `problem_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
