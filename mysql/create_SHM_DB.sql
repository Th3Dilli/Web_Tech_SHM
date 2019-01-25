-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema smarthome
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema smarthome
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `smarthome` DEFAULT CHARACTER SET utf8 ;
USE `smarthome` ;

-- -----------------------------------------------------
-- Table `smarthome`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smarthome`.`users` (
  `users_id` INT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(45) NULL,
  `username` VARCHAR(45) NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(45) NULL,
  `last_login` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`users_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smarthome`.`device`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smarthome`.`device` (
  `device_id` INT NOT NULL AUTO_INCREMENT,
  `module_type` VARCHAR(45) NULL,
  `device_name` VARCHAR(45) NULL,
  `ip` VARCHAR(15) NULL,
  `mac` VARCHAR(17) NULL,
  `category` VARCHAR(45) NULL,
  PRIMARY KEY (`device_id`),
  UNIQUE INDEX `mac_UNIQUE` (`mac` ASC) VISIBLE,
  UNIQUE INDEX `ip_UNIQUE` (`ip` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smarthome`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smarthome`.`rooms` (
  `rooms_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`rooms_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smarthome`.`users_has_rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smarthome`.`users_has_rooms` (
  `users_users_id` INT NOT NULL,
  `rooms_rooms_id` INT NOT NULL,
  PRIMARY KEY (`users_users_id`, `rooms_rooms_id`),
  INDEX `fk_users_has_rooms_rooms1_idx` (`rooms_rooms_id` ASC) VISIBLE,
  INDEX `fk_users_has_rooms_users_idx` (`users_users_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_rooms_users`
    FOREIGN KEY (`users_users_id`)
    REFERENCES `smarthome`.`users` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_rooms_rooms1`
    FOREIGN KEY (`rooms_rooms_id`)
    REFERENCES `smarthome`.`rooms` (`rooms_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smarthome`.`rooms_has_device`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smarthome`.`rooms_has_device` (
  `rooms_rooms_id` INT NOT NULL,
  `device_device_id` INT NOT NULL,
  PRIMARY KEY (`rooms_rooms_id`, `device_device_id`),
  INDEX `fk_rooms_has_device_device1_idx` (`device_device_id` ASC) VISIBLE,
  INDEX `fk_rooms_has_device_rooms1_idx` (`rooms_rooms_id` ASC) VISIBLE,
  CONSTRAINT `fk_rooms_has_device_rooms1`
    FOREIGN KEY (`rooms_rooms_id`)
    REFERENCES `smarthome`.`rooms` (`rooms_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rooms_has_device_device1`
    FOREIGN KEY (`device_device_id`)
    REFERENCES `smarthome`.`device` (`device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `smarthome`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `smarthome`;
INSERT INTO `smarthome`.`users` (`users_id`, `role`, `username`, `email`, `password`, `last_login`, `created`) VALUES (DEFAULT, 'admin', 'admin', 'admin@mail.com', '1234', NULL, NULL);
INSERT INTO `smarthome`.`users` (`users_id`, `role`, `username`, `email`, `password`, `last_login`, `created`) VALUES (DEFAULT, 'user', 'markus', 'markus@mail.com', '1234', NULL, NULL);
INSERT INTO `smarthome`.`users` (`users_id`, `role`, `username`, `email`, `password`, `last_login`, `created`) VALUES (DEFAULT, 'user', 'dilli', 'dilli.1822@gmx.at', '1234', NULL, NULL);
INSERT INTO `smarthome`.`users` (`users_id`, `role`, `username`, `email`, `password`, `last_login`, `created`) VALUES (DEFAULT, 'user', 'phillip', 'phillip@mail.com', '1234', NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `smarthome`.`device`
-- -----------------------------------------------------
START TRANSACTION;
USE `smarthome`;
INSERT INTO `smarthome`.`device` (`device_id`, `module_type`, `device_name`, `ip`, `mac`, `category`) VALUES (DEFAULT, 'SONOFF_BASIC', 'Light1', '10.0.0.101', 'mac1', 'light');
INSERT INTO `smarthome`.`device` (`device_id`, `module_type`, `device_name`, `ip`, `mac`, `category`) VALUES (DEFAULT, 'SONOFF_BASIC', 'Light2', '10.0.0.102', 'mac2', 'light');
INSERT INTO `smarthome`.`device` (`device_id`, `module_type`, `device_name`, `ip`, `mac`, `category`) VALUES (DEFAULT, 'SONOFF_BASIC', 'Light3', '10.0.0.103', 'mac3', 'light');
INSERT INTO `smarthome`.`device` (`device_id`, `module_type`, `device_name`, `ip`, `mac`, `category`) VALUES (DEFAULT, 'SONOFF_BASIC', 'Light4', '10.0.0.104', 'mac4', 'light');
INSERT INTO `smarthome`.`device` (`device_id`, `module_type`, `device_name`, `ip`, `mac`, `category`) VALUES (DEFAULT, 'SONOFF_4CH', 'Multi1', '10.0.0.105', 'mac5', 'controller');
INSERT INTO `smarthome`.`device` (`device_id`, `module_type`, `device_name`, `ip`, `mac`, `category`) VALUES (DEFAULT, 'SONOFF_4CH', 'Multi2', '10.0.0.106', 'mac6', 'controller');
INSERT INTO `smarthome`.`device` (`device_id`, `module_type`, `device_name`, `ip`, `mac`, `category`) VALUES (DEFAULT, 'SONOFF_4CH', 'Multi3', '10.0.0.107', 'mac7', 'controller');
INSERT INTO `smarthome`.`device` (`device_id`, `module_type`, `device_name`, `ip`, `mac`, `category`) VALUES (DEFAULT, 'SONOFF_4CH', 'Multi4', '10.0.0.108', 'mac8', 'controller');
INSERT INTO `smarthome`.`device` (`device_id`, `module_type`, `device_name`, `ip`, `mac`, `category`) VALUES (DEFAULT, 'SONOFF_BASIC', 'Light5', '10.0.0.109', 'mac9', 'light');
INSERT INTO `smarthome`.`device` (`device_id`, `module_type`, `device_name`, `ip`, `mac`, `category`) VALUES (DEFAULT, 'SONOFF_BASIC', 'Light6', '10.0.0.110', 'mac10', 'light');
INSERT INTO `smarthome`.`device` (`device_id`, `module_type`, `device_name`, `ip`, `mac`, `category`) VALUES (DEFAULT, 'SONOFF_BASIC', 'Light7', '10.0.0.111', 'mac11', 'light');
INSERT INTO `smarthome`.`device` (`device_id`, `module_type`, `device_name`, `ip`, `mac`, `category`) VALUES (DEFAULT, 'SONOFF_BASIC', 'Light8', '10.0.0.112', 'mac12', 'light');

COMMIT;


-- -----------------------------------------------------
-- Data for table `smarthome`.`rooms`
-- -----------------------------------------------------
START TRANSACTION;
USE `smarthome`;
INSERT INTO `smarthome`.`rooms` (`rooms_id`, `name`) VALUES (DEFAULT, 'kitchen');
INSERT INTO `smarthome`.`rooms` (`rooms_id`, `name`) VALUES (DEFAULT, 'bedroom');
INSERT INTO `smarthome`.`rooms` (`rooms_id`, `name`) VALUES (DEFAULT, 'livingroom');
INSERT INTO `smarthome`.`rooms` (`rooms_id`, `name`) VALUES (DEFAULT, 'entrance');
INSERT INTO `smarthome`.`rooms` (`rooms_id`, `name`) VALUES (DEFAULT, 'dilli_rooms');
INSERT INTO `smarthome`.`rooms` (`rooms_id`, `name`) VALUES (DEFAULT, 'markus_room');
INSERT INTO `smarthome`.`rooms` (`rooms_id`, `name`) VALUES (DEFAULT, 'phillip_room');

COMMIT;


-- -----------------------------------------------------
-- Data for table `smarthome`.`users_has_rooms`
-- -----------------------------------------------------
START TRANSACTION;
USE `smarthome`;
INSERT INTO `smarthome`.`users_has_rooms` (`users_users_id`, `rooms_rooms_id`) VALUES (2, 6);
INSERT INTO `smarthome`.`users_has_rooms` (`users_users_id`, `rooms_rooms_id`) VALUES (2, 1);
INSERT INTO `smarthome`.`users_has_rooms` (`users_users_id`, `rooms_rooms_id`) VALUES (2, 3);
INSERT INTO `smarthome`.`users_has_rooms` (`users_users_id`, `rooms_rooms_id`) VALUES (2, 4);
INSERT INTO `smarthome`.`users_has_rooms` (`users_users_id`, `rooms_rooms_id`) VALUES (3, 1);
INSERT INTO `smarthome`.`users_has_rooms` (`users_users_id`, `rooms_rooms_id`) VALUES (3, 3);
INSERT INTO `smarthome`.`users_has_rooms` (`users_users_id`, `rooms_rooms_id`) VALUES (3, 4);
INSERT INTO `smarthome`.`users_has_rooms` (`users_users_id`, `rooms_rooms_id`) VALUES (3, 5);
INSERT INTO `smarthome`.`users_has_rooms` (`users_users_id`, `rooms_rooms_id`) VALUES (4, 1);
INSERT INTO `smarthome`.`users_has_rooms` (`users_users_id`, `rooms_rooms_id`) VALUES (4, 3);
INSERT INTO `smarthome`.`users_has_rooms` (`users_users_id`, `rooms_rooms_id`) VALUES (4, 4);
INSERT INTO `smarthome`.`users_has_rooms` (`users_users_id`, `rooms_rooms_id`) VALUES (4, 7);

COMMIT;


-- -----------------------------------------------------
-- Data for table `smarthome`.`rooms_has_device`
-- -----------------------------------------------------
START TRANSACTION;
USE `smarthome`;
INSERT INTO `smarthome`.`rooms_has_device` (`rooms_rooms_id`, `device_device_id`) VALUES (1, 9);
INSERT INTO `smarthome`.`rooms_has_device` (`rooms_rooms_id`, `device_device_id`) VALUES (2, 10);
INSERT INTO `smarthome`.`rooms_has_device` (`rooms_rooms_id`, `device_device_id`) VALUES (3, 11);
INSERT INTO `smarthome`.`rooms_has_device` (`rooms_rooms_id`, `device_device_id`) VALUES (4, 12);
INSERT INTO `smarthome`.`rooms_has_device` (`rooms_rooms_id`, `device_device_id`) VALUES (5, 1);
INSERT INTO `smarthome`.`rooms_has_device` (`rooms_rooms_id`, `device_device_id`) VALUES (5, 5);
INSERT INTO `smarthome`.`rooms_has_device` (`rooms_rooms_id`, `device_device_id`) VALUES (6, 2);
INSERT INTO `smarthome`.`rooms_has_device` (`rooms_rooms_id`, `device_device_id`) VALUES (6, 6);
INSERT INTO `smarthome`.`rooms_has_device` (`rooms_rooms_id`, `device_device_id`) VALUES (7, 3);
INSERT INTO `smarthome`.`rooms_has_device` (`rooms_rooms_id`, `device_device_id`) VALUES (7, 7);
INSERT INTO `smarthome`.`rooms_has_device` (`rooms_rooms_id`, `device_device_id`) VALUES (4, 8);
INSERT INTO `smarthome`.`rooms_has_device` (`rooms_rooms_id`, `device_device_id`) VALUES (1, 4);

COMMIT;

