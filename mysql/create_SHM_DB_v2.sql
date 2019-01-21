-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema smarthome
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema smarthome
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `smarthome` DEFAULT CHARACTER SET utf8 ;
USE `smarthome` ;

-- -----------------------------------------------------
-- Table `smarthome`.`device`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smarthome`.`device` (
  `id` INT(10) UNSIGNED NOT NULL,
  `module_type` VARCHAR(45) NULL DEFAULT NULL,
  `device_name` VARCHAR(45) NOT NULL,
  `ip` VARCHAR(15) NOT NULL,
  `mac` VARCHAR(17) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `mac_UNIQUE` (`mac` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `smarthome`.`room_devices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smarthome`.`room_devices` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `room_id` INT(10) NULL DEFAULT NULL,
  `device_id` INT(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `device_id_UNIQUE` (`device_id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `smarthome`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smarthome`.`rooms` (
  `id` INT(10) NOT NULL,
  `room_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`room_name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `smarthome`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smarthome`.`users` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `last_login` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `room_id` INT(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idusers_UNIQUE` (`id` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `room_id_UNIQUE` (`room_id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
