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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('client','freelancer') NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `profileImageUrl` varchar(255) DEFAULT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (16,'Rahul','rahul123@gmail.com','$2b$10$8ERptJXHj1ySfwwzpI6/A.La0aFZBFn9sJ.doIMCLPE3WlALcT20O','client',' We’re passionate about building meaningful digital experiences that improve lives. I\'m here to connect with talented designers, developers, and content creators to collaborate on exciting projects ranging from app development to branding.','https://res.cloudinary.com/dvacmvrws/image/upload/v1745926684/ilsgqub2mqbv2gquufdp.jpg',1,'2025-04-29 17:08:03.063336','2025-04-29 17:08:03.063336'),(17,'Amit','amit123@gmail.com','$2b$10$vCOJH4IikN5dYCLfVSP5mOQM8yKtb/yA3/B91ymgsABQuQeoy1geW','freelancer','Hey I\'m Amit, a passionate full-stack developer with 3+ years of experience building web apps that are fast, responsive, and scalable. I specialize in React, Node.js, and TypeScript, and I love turning complex problems into clean, efficient solution','https://res.cloudinary.com/dvacmvrws/image/upload/v1745926972/hlyelb7cxu0p9ojwjltu.jpg',1,'2025-04-29 17:12:50.827940','2025-04-29 17:12:50.827940'),(18,'Mohit','mohit123@gmail.com','$2b$10$M0PknPqY8AoYGEZBFlYeZ.A6xEAas/AgFxx7nPBfWK5bcmjx65Wgq','freelancer','Coding is fun ⭐?','https://res.cloudinary.com/dvacmvrws/image/upload/v1746025528/vrdfdrq7zdiq0xqvvroo.jpg',1,'2025-04-30 20:35:26.375218','2025-04-30 20:35:26.375218');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
