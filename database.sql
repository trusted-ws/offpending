CREATE DATABASE IF NOT EXISTS `offpending`;
USE `offpending`;

DROP TABLE IF EXISTS `requests`;
CREATE TABLE `requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `input_a` varchar(255) NOT NULL,
  `input_b` varchar(255) NOT NULL,
  `input_c` varchar(255) NOT NULL,
  `input_d` varchar(255) NOT NULL,
  `stored_at` datetime NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;