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
-- Table structure for table `bid`
--

DROP TABLE IF EXISTS `bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bid` (
  `id` int NOT NULL AUTO_INCREMENT,
  `initialAmount` decimal(10,0) NOT NULL,
  `initialDurationDays` int NOT NULL,
  `finalAmount` float DEFAULT NULL,
  `finalDurationDays` float DEFAULT NULL,
  `initialMessage` text NOT NULL,
  `status` enum('open','negotiate','accepted','rejected') DEFAULT NULL,
  `freelancerId` int DEFAULT NULL,
  `projectId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_df7bbfd8e0fd698f38589361912` (`freelancerId`),
  KEY `FK_bfde5a03e8655884abb27140dab` (`projectId`),
  CONSTRAINT `FK_bfde5a03e8655884abb27140dab` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`),
  CONSTRAINT `FK_df7bbfd8e0fd698f38589361912` FOREIGN KEY (`freelancerId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bid`
--

LOCK TABLES `bid` WRITE;
/*!40000 ALTER TABLE `bid` DISABLE KEYS */;
INSERT INTO `bid` VALUES (1,12000,7,NULL,NULL,'THis is very interesting project i would like to contribute to it.','accepted',17,1),(2,8000,12,NULL,NULL,'Hi! I specialize in building modern, user-friendly eCommerce websites with features like product filtering, secure checkout, and responsive design. I\'d love to help bring your store to life. Let’s chat about your goals!','accepted',18,2),(3,7990,7,NULL,NULL,'Hello! I’ve helped businesses launch successful eCommerce stores that boost sales and improve user experience. I can deliver a fast, secure, and scalable solution tailored to your needs. Let’s make your online store stand out!','rejected',17,2),(4,300000,100,NULL,NULL,'this is very interesting game i would love to contribute in it','accepted',17,3);
/*!40000 ALTER TABLE `bid` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-01  1:51:13
