CREATE DATABASE  IF NOT EXISTS `freelancedb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `freelancedb`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: freelancedb
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bid_negotiation`
--

DROP TABLE IF EXISTS `bid_negotiation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bid_negotiation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `proposedAmount` decimal(10,0) DEFAULT NULL,
  `proposedDurationDays` int DEFAULT NULL,
  `message` text,
  `sentAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `bidId` int DEFAULT NULL,
  `senderId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_93442bef654c46cfe519eb5dd23` (`bidId`),
  KEY `FK_9fceac577df8cf56a868d20e8bb` (`senderId`),
  CONSTRAINT `FK_93442bef654c46cfe519eb5dd23` FOREIGN KEY (`bidId`) REFERENCES `bid` (`id`),
  CONSTRAINT `FK_9fceac577df8cf56a868d20e8bb` FOREIGN KEY (`senderId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bid_negotiation`
--

LOCK TABLES `bid_negotiation` WRITE;
/*!40000 ALTER TABLE `bid_negotiation` DISABLE KEYS */;
/*!40000 ALTER TABLE `bid_negotiation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-01  1:51:12
