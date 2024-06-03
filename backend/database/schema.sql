CREATE TABLE `tests`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` ENUM("Subida de Rampa em 45° (contagem de distância)", "Velocidade máxima com manobrabilidade (contagem de tempo)", "Tração (contagem de peso)"),
    /*if value is 0. this means, that the squad does'nt did the test.*/
    `value` DECIMAL(8, 2) DEFAULT 0,
    `value_description` ENUM("metros", "segundos", "gramas"),
    /* penalty will be added to the value. so, the final test result is value + penalty */
    `penalty` DECIMAL(8, 2) NULL,
    `penalty_description` VARCHAR(64) NULL,
    `squad_id` INT UNSIGNED NOT NULL,
    UNIQUE KEY `tests_name_squad_id_unique` (`name`, `squad_id`)
);
CREATE TABLE `squads`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(64) NOT NULL UNIQUE,
    `car_id` VARCHAR(32) NOT NULL UNIQUE
);
CREATE TABLE `students`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(64) NOT NULL,
    `RA` VARCHAR(10) UNIQUE,
    `squad_id` INT UNSIGNED NOT NULL
);
ALTER TABLE
    `students` ADD CONSTRAINT `students_squad_id_foreign` FOREIGN KEY(`squad_id`) REFERENCES `squads`(`id`) ON DELETE CASCADE;
ALTER TABLE
    `tests` ADD CONSTRAINT `tests_squad_id_foreign` FOREIGN KEY(`squad_id`) REFERENCES `squads`(`id`) ON DELETE CASCADE;
