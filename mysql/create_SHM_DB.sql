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
  PRIMARY KEY (`device_id`),
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
INSERT INTO `smarthome`.`users` (`users_id`, `role`, `username`, `email`, `password`, `last_login`, `created`) VALUES (DEFAULT, 'user', 'user', 'testuser@mail.com', '1234', NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `smarthome`.`device`
-- -----------------------------------------------------
START TRANSACTION;
USE `smarthome`;
INSERT INTO `smarthome`.`device` (`device_id`, `module_type`, `device_name`, `ip`, `mac`) VALUES (DEFAULT, 'SONOFF_BASIC', 'WZ_Licht', '10.0.0.3', 'mac1');
INSERT INTO `smarthome`.`device` (`device_id`, `module_type`, `device_name`, `ip`, `mac`) VALUES (DEFAULT, 'SONOFF_4CH', 'Flur_Lichter', '10.0.0.11', 'mac2');
INSERT INTO `smarthome`.`device` (`device_id`, `module_type`, `device_name`, `ip`, `mac`) VALUES (DEFAULT, 'SONOFF_BASIC', 'SZ_Licht', '10.0.0.27', 'mac3');
INSERT INTO `smarthome`.`device` (`device_id`, `module_type`, `device_name`, `ip`, `mac`) VALUES (DEFAULT, 'SONOFF_TOUCH', 'BZ_Licht', '10.0.0.12', 'mac4');

COMMIT;


-- -----------------------------------------------------
-- Data for table `smarthome`.`rooms`
-- -----------------------------------------------------
START TRANSACTION;
USE `smarthome`;
INSERT INTO `smarthome`.`rooms` (`rooms_id`, `name`) VALUES (DEFAULT, 'Flur');
INSERT INTO `smarthome`.`rooms` (`rooms_id`, `name`) VALUES (DEFAULT, 'Schlafzimmer');
INSERT INTO `smarthome`.`rooms` (`rooms_id`, `name`) VALUES (DEFAULT, 'Wohnzimmer');
INSERT INTO `smarthome`.`rooms` (`rooms_id`, `name`) VALUES (DEFAULT, 'Badezimmer');

COMMIT;


-- -----------------------------------------------------
-- Data for table `smarthome`.`rooms_has_device`
-- -----------------------------------------------------
START TRANSACTION;
USE `smarthome`;
INSERT INTO `smarthome`.`rooms_has_device` (`rooms_rooms_id`, `device_device_id`) VALUES (1, 2);
INSERT INTO `smarthome`.`rooms_has_device` (`rooms_rooms_id`, `device_device_id`) VALUES (2, 3);
INSERT INTO `smarthome`.`rooms_has_device` (`rooms_rooms_id`, `device_device_id`) VALUES (3, 1);
INSERT INTO `smarthome`.`rooms_has_device` (`rooms_rooms_id`, `device_device_id`) VALUES (4, 4);

COMMIT;

