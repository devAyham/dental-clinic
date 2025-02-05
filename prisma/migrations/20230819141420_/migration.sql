-- DropForeignKey
ALTER TABLE `book_ins` DROP FOREIGN KEY `book_ins_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `book_outs` DROP FOREIGN KEY `book_outs_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `stored_products` DROP FOREIGN KEY `stored_products_product_id_fkey`;

-- AddForeignKey
ALTER TABLE `book_ins` ADD CONSTRAINT `book_ins_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stored_products` ADD CONSTRAINT `stored_products_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `book_outs` ADD CONSTRAINT `book_outs_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
