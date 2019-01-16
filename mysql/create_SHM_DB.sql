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
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `token` VARCHAR(45) NOT NULL,
  `last_login` DATETIME NOT NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idusers_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `token_UNIQUE` (`token` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smarthome`.`device`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smarthome`.`device` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `module_type` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `ip` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smarthome`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smarthome`.`rooms` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `device_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smarthome`.`room_devices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smarthome`.`room_devices` (
  `room_id` INT UNSIGNED NOT NULL,
  `device_id` INT UNSIGNED NOT NULL)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `smarthome`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `smarthome`;
INSERT INTO `smarthome`.`users` (`id`, `username`, `password`, `token`, `last_login`) VALUES (DEFAULT, 'admin', '1234', DEFAULT, DEFAULT);

COMMIT;

