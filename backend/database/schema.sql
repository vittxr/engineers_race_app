CREATE TABLE `tests`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(64) NOT NULL UNIQUE,
    `race_score` INT NOT NULL,
    `race_position` INT NOT NULL,
    `value` DECIMAL(8, 2) NOT NULL,
    `value_description` VARCHAR(64) NOT NULL,
    `penalty` DECIMAL(8, 2) NULL,
    `penalty_description` VARCHAR(64) NULL,
    `squad_id` INT UNSIGNED NOT NULL
);
CREATE TABLE `squads`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(64) NOT NULL UNIQUE,
    `grade` INT,
    `car_id` VARCHAR(32) NOT NULL UNIQUE
);
CREATE TABLE `students`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(64) NOT NULL,
    `RA` VARCHAR(10) NOT NULL UNIQUE,
    `squad_id` INT UNSIGNED NOT NULL
);
ALTER TABLE
    `students` ADD CONSTRAINT `students_squad_id_foreign` FOREIGN KEY(`squad_id`) REFERENCES `squads`(`id`);
ALTER TABLE
    `tests` ADD CONSTRAINT `tests_squad_id_foreign` FOREIGN KEY(`squad_id`) REFERENCES `squads`(`id`);