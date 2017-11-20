CREATE DATABASE  IF NOT EXISTS `worldtrans` /*!40100 DEFAULT CHARACTER SET utf16 COLLATE utf16_bin */;
USE `worldtrans`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: worldtrans
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf16_bin DEFAULT NULL COMMENT 'Carrier name',
  `ReciveDate` datetime DEFAULT NULL,
  `Weghit` varchar(45) COLLATE utf16_bin DEFAULT NULL,
  `Dimention` varchar(45) COLLATE utf16_bin DEFAULT NULL,
  `ShipDate` datetime DEFAULT NULL,
  `Carrier` varchar(45) COLLATE utf16_bin DEFAULT NULL,
  `Tracking` varchar(45) COLLATE utf16_bin DEFAULT NULL,
  `Notes` text COLLATE utf16_bin,
  `userid` int(11) DEFAULT NULL,
  `address` varchar(45) COLLATE utf16_bin DEFAULT NULL,
  `city` varchar(45) COLLATE utf16_bin DEFAULT NULL,
  `country` varchar(45) COLLATE utf16_bin DEFAULT NULL,
  `phone` varchar(45) COLLATE utf16_bin DEFAULT NULL,
  `zip` varchar(45) COLLATE utf16_bin DEFAULT NULL,
  `shiptoname` varchar(45) COLLATE utf16_bin DEFAULT NULL,
  `customerdeclarevalue` decimal(10,0) DEFAULT NULL,
  `customerdeclaretxt` varchar(3000) COLLATE utf16_bin DEFAULT NULL,
  `recievedby` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKUSER` (`userid`,`ReciveDate`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf16 COLLATE=utf16_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'Amazon','2017-10-29 12:47:02','20','20x20','2017-10-29 11:45:20','USPS','111111','blah blah blah',25,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'Walmart','2017-10-29 12:47:02','30','20x20x20','2017-10-29 11:45:20','FedEx','111111','blah blah blue',25,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'Overstock','2017-10-29 12:47:02','30','20x20x20','2017-10-29 11:45:20','FedEx','111111','הזמנה גרועה חבלז',25,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'Overstock','2017-10-29 12:47:02','30','20x20x20','2017-10-29 11:45:20','FedEx','111111','blah blah blue',24,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'Amazon','2017-10-29 12:47:02','20','20x20','2017-10-29 11:45:20','','','blah blah blah',25,'121212','city1','Italy','5086262561','01760','דוד',770,'lovely',NULL),(7,'OverStock','2017-10-29 12:47:02','20','20x20','2017-10-29 11:45:20','','','blah blah blah',25,'st2','cit2','il','tel2','zip2','מושיקו',99,'very nice order',NULL),(8,NULL,'2017-11-20 20:02:10','40','1X2X3',NULL,NULL,NULL,'notela',16,'','','','','','222 111',NULL,NULL,24),(9,NULL,'2017-11-20 20:04:52','40','1X2X3',NULL,NULL,NULL,'notela',16,'','','','','','222 111',NULL,NULL,24),(10,'amazon','2017-11-20 20:14:44','50','1X2X3',NULL,NULL,NULL,'notes and notela\nbalulu',13,'3 shady oak ln','natick','Israel','5086262561','12919','111 111',NULL,NULL,24),(11,'OS','2017-11-20 20:32:50','90','2X3X4',NULL,NULL,NULL,'',12,'3 shady oak ln','natick','Israel','5086262561','12919','Buzaglo Moshiko',NULL,NULL,24),(12,'OS','2017-11-20 21:01:04','12','12X2X3',NULL,NULL,NULL,'',12,'3 shady oak ln','natick','Israel','5086262561','12919','Buzaglo Moshiko',NULL,NULL,24);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temp`
--

DROP TABLE IF EXISTS `temp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `temp` (
  `idnew_table` int(11) NOT NULL,
  `b` varchar(45) COLLATE utf16_bin DEFAULT NULL,
  PRIMARY KEY (`idnew_table`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temp`
--

LOCK TABLES `temp` WRITE;
/*!40000 ALTER TABLE `temp` DISABLE KEYS */;
INSERT INTO `temp` VALUES (1,'מש');
/*!40000 ALTER TABLE `temp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastIn` datetime DEFAULT NULL,
  `fname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `WH` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Use for a WH users',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'1@1.com','name1','pass1','E6328289119432605696S','2017-10-23 21:01:40',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'2@2.com','name2','pass2',NULL,'2017-10-26 09:44:09','fname1','lname2',NULL,NULL,NULL,NULL,NULL,NULL),(3,'2@1.com',NULL,'111','E6323569580207767552S','2017-10-10 20:27:54','111','111','3 shady oak ln','natick','5086262561',NULL,NULL,NULL),(4,'3@1.com',NULL,'111','E6323574115500294144S','2017-10-10 20:45:55','111','111','3 shady oak ln','natick','5086262561','12919','Israel',NULL),(5,'4@1.com',NULL,'111','E6323578054698336256S','2017-10-10 21:01:34','111','111','3 shady oak ln','natick','5086262561','12919','Israel',NULL),(6,'5@1.com',NULL,'111','E6323579531181424640S','2017-10-10 21:07:26','111','111','3 shady oak ln','natick','5086262561','12919','Israel',NULL),(7,'6@1.com',NULL,'111','E6323730181420744704S','2017-10-11 07:06:04','111','111','3 shady oak ln','natick','5086262561','12919','Israel',NULL),(8,'7@1.com',NULL,'111','E6323730701736738816S','2017-10-11 07:08:08','111','111','3 shady oak ln','natick','5086262561','12919','Israel',NULL),(9,'8@1.com',NULL,'111','E6323730989201752064S','2017-10-11 07:09:17','111','111','3 shady oak ln','natick','5086262561','12919','Israel',NULL),(10,'9@1.com',NULL,'111','E6323731821607518208S','2017-10-11 07:12:35','111','111','3 shady oak ln','natick','5086262561','12919','Israel',NULL),(11,'10@1.com',NULL,'111','E6323734357420802048S','2017-10-11 07:22:40','111','111','3 shady oak ln','natick','5086262561','12919','Israel',NULL),(12,'11@1.com',NULL,'111','E6323735004446720000S','2017-10-11 07:25:14','Moshiko','Buzaglo','3 shady oak ln','natick','5086262561','12919','Israel',NULL),(13,'12@1.com',NULL,'111','E6323735299952214016S','2017-10-11 07:26:24','111','111','3 shady oak ln','natick','5086262561','12919','Israel',NULL),(14,'13@1.com',NULL,'111','E6323735820599558144S','2017-10-11 07:28:28','111','111','3 shady oak ln','natick','5086262561','12919','Israel',NULL),(15,'Q@Q.com',NULL,'111','E6323737685315813376S','2017-10-11 07:35:53','111','111','','','','','',NULL),(16,'w@w.com',NULL,'111','E6323739487935397888S','2017-10-11 07:43:03','111','222','','','','','',NULL),(17,'e@w.com',NULL,'111','E6323742021936742400S','2017-10-11 07:53:07','111','222','','','','','',NULL),(18,'r@w.com',NULL,'111','E6323742482190303232S','2017-10-11 07:54:57','111','222','','','','','',NULL),(19,'t@w.com',NULL,'111','E6323742900186251264S','2017-10-11 07:56:36','111','222','','','','','',NULL),(20,'mosh@abugzir.com',NULL,'111','E6328161913142247424S','2017-10-23 12:36:11','Mou','Abu','','','','','',NULL),(21,'m1@co.il',NULL,'111','E6328163093499084800S','2017-10-23 12:40:53','mou','abugzir','','','','','',NULL),(22,'m2@1.co',NULL,'111','E6328163845189664768S','2017-10-23 12:43:52','mou','abu','','','','','',NULL),(23,'m3@d.com',NULL,'111',NULL,'2017-10-23 15:19:54','משה','בובליל','','','','','',NULL),(24,'b@g.com',NULL,'111','E6338450812431237120S','2017-11-20 21:00:36','ברוך','גמילי','','','','','','IFC'),(25,'a@a.com',NULL,'avi',NULL,'2017-11-20 20:29:44','Moooshe','Rabenuuu','3 shady oak ln111','Natick','5086550636','01760','Israel the only place',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-20 22:11:24
