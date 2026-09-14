CREATE TABLE `daily_goals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`starts_on` text NOT NULL,
	`kcal` real NOT NULL,
	`protein_g` real NOT NULL,
	`carbs_g` real NOT NULL,
	`fat_g` real NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `daily_goals_startsOn_unique` ON `daily_goals` (`starts_on`);--> statement-breakpoint
CREATE TABLE `log_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`meal` text NOT NULL,
	`product_id` integer,
	`name` text NOT NULL,
	`portion_kind` text,
	`portion_value` real,
	`amount` real,
	`unit` text,
	`kcal_per100` real,
	`protein_per100` real,
	`carbs_per100` real,
	`fat_per100` real,
	`sugars_per100` real,
	`saturated_fat_per100` real,
	`fibre_per100` real,
	`salt_per100` real,
	`serving_size` real,
	`package_size` real,
	`kcal` real NOT NULL,
	`protein` real,
	`carbs` real,
	`fat` real,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `log_entries_date_idx` ON `log_entries` (`date`);--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`brand` text,
	`barcode` text,
	`source` text NOT NULL,
	`unit` text NOT NULL,
	`kcal` real NOT NULL,
	`protein` real NOT NULL,
	`carbs` real NOT NULL,
	`fat` real NOT NULL,
	`sugars` real,
	`saturated_fat` real,
	`fibre` real,
	`salt` real,
	`serving_size` real,
	`serving_label` text,
	`package_size` real,
	`label_photo_path` text,
	`last_used_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_barcode_unique` ON `products` (`barcode`);--> statement-breakpoint
CREATE INDEX `products_name_idx` ON `products` (`name`);--> statement-breakpoint
CREATE INDEX `products_last_used_at_idx` ON `products` (`last_used_at`);