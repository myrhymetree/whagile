-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 3.36.153.51    Database: project
-- ------------------------------------------------------
-- Server version	5.7.38-0ubuntu0.18.04.1

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
-- Table structure for table `TBL_AUTHORITY`
--

DROP TABLE IF EXISTS `TBL_AUTHORITY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_AUTHORITY` (
                                 `AUTHORITY_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '권한번호',
                                 `AUTHORITY_NAME` varchar(30) NOT NULL COMMENT '권한명',
                                 `AUTHORITY_DESCRIPTION` varchar(200) DEFAULT NULL COMMENT '권한설명',
                                 `AUTHORITY_ACTIVATED_YN` varchar(5) NOT NULL DEFAULT 'N' COMMENT '활성화여부',
                                 `AUTHORITY_DATE` varchar(30) DEFAULT NULL COMMENT '권한설정적용일자',
                                 `AUTHORITY_EXPOSURE_ORDER` mediumint(9) DEFAULT NULL COMMENT '노출순서',
                                 `AUTHORITY_DELETED_YN` varchar(30) NOT NULL DEFAULT 'N',
                                 PRIMARY KEY (`AUTHORITY_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=utf8mb4 COMMENT='권한';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_AUTHORITY`
--

LOCK TABLES `TBL_AUTHORITY` WRITE;
/*!40000 ALTER TABLE `TBL_AUTHORITY` DISABLE KEYS */;
INSERT INTO `TBL_AUTHORITY` VALUES (1,'PM','초대 및 권한 부여 가능','Y','2022-01-01',1,'N'),(2,'팀원','쓰기 가능','Y','2022-01-24',2,'N'),(3,'게스트','읽기 가능','Y','2022-02-02',3,'N');
/*!40000 ALTER TABLE `TBL_AUTHORITY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_AUTHORITY_HISTORY`
--

DROP TABLE IF EXISTS `TBL_AUTHORITY_HISTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_AUTHORITY_HISTORY` (
                                         `AUTHORITY_HISTORY_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '권한 히스토리 식별번호',
                                         `AUTHORITY_OCCURRENCE_DATE` varchar(30) NOT NULL COMMENT '이력발생일',
                                         `AUTHORITY_HISTORY_OCCURRENCE` varchar(200) NOT NULL COMMENT '이력발생내용',
                                         `AUTHORITY_CODE` mediumint(9) NOT NULL COMMENT '권한번호',
                                         `MEMBER_CODE` mediumint(9) NOT NULL COMMENT '회원번호',
                                         PRIMARY KEY (`AUTHORITY_HISTORY_CODE`),
                                         KEY `TBL_AUTHORITY_HISTORY_FK` (`MEMBER_CODE`),
                                         KEY `TBL_AUTHORITY_HISTORY_FK1` (`AUTHORITY_CODE`),
                                         CONSTRAINT `TBL_AUTHORITY_HISTORY_FK` FOREIGN KEY (`MEMBER_CODE`) REFERENCES `TBL_MEMBER` (`MEMBER_CODE`),
                                         CONSTRAINT `TBL_AUTHORITY_HISTORY_FK1` FOREIGN KEY (`AUTHORITY_CODE`) REFERENCES `TBL_AUTHORITY` (`AUTHORITY_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COMMENT='권한히스토리';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_AUTHORITY_HISTORY`
--

LOCK TABLES `TBL_AUTHORITY_HISTORY` WRITE;
/*!40000 ALTER TABLE `TBL_AUTHORITY_HISTORY` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_AUTHORITY_HISTORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_BACKLOG`
--

DROP TABLE IF EXISTS `TBL_BACKLOG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_BACKLOG` (
                               `BACKLOG_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '백로그 번호',
                               `BACKLOG_TITLE` varchar(30) NOT NULL COMMENT '백로그 제목',
                               `BACKLOG_DESCRIPTION` varchar(300) DEFAULT NULL COMMENT '백로그 설명',
                               `BACKLOG_PROGRESS_STATUS` varchar(30) NOT NULL DEFAULT '백로그' COMMENT '진행상태',
                               `BACKLOG_URGENCY` varchar(30) DEFAULT NULL COMMENT '긴급도',
                               `BACKLOG_CHARGER_CODE` mediumint(9) DEFAULT NULL COMMENT '담당자',
                               `BACKLOG_CATEGORY` varchar(30) NOT NULL COMMENT '백로그 카테고리',
                               `SPRINT_CODE` mediumint(9) DEFAULT NULL COMMENT '스프린트번호',
                               `PROJECT_CODE` mediumint(9) NOT NULL COMMENT '프로젝트 번호',
                               `BACKLOG_CREATOR_CODE` mediumint(9) NOT NULL,
                               `BACKLOG_ISSUE` tinyint(1) NOT NULL DEFAULT '0' COMMENT '이슈여부',
                               `BACKLOG_DELETED_YN` varchar(30) NOT NULL DEFAULT 'N' COMMENT '삭제여부',
                               `BACKLOG_START_DATE` varchar(30) DEFAULT NULL,
                               `BACKLOG_END_DATE` varchar(30) DEFAULT NULL,
                               PRIMARY KEY (`BACKLOG_CODE`),
                               KEY `TBL_BACKLOG_FK` (`SPRINT_CODE`),
                               KEY `TBL_BACKLOG_FK1` (`BACKLOG_CREATOR_CODE`,`PROJECT_CODE`),
                               KEY `TBL_PROJECT_MEMBER` (`BACKLOG_CHARGER_CODE`),
                               CONSTRAINT `TBL_BACKLOG_FK` FOREIGN KEY (`SPRINT_CODE`) REFERENCES `TBL_SPRINT` (`SPRINT_CODE`),
                               CONSTRAINT `TBL_BACKLOG_FK1` FOREIGN KEY (`BACKLOG_CREATOR_CODE`, `PROJECT_CODE`) REFERENCES `TBL_PROJECT_MEMBER` (`MEMBER_CODE`, `PROJECT_CODE`),
                               CONSTRAINT `TBL_PROJECT_MEMBER` FOREIGN KEY (`BACKLOG_CHARGER_CODE`) REFERENCES `TBL_PROJECT_MEMBER` (`MEMBER_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8mb4 COMMENT='백로그';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_BACKLOG`
--

LOCK TABLES `TBL_BACKLOG` WRITE;
/*!40000 ALTER TABLE `TBL_BACKLOG` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_BACKLOG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_BACKLOG_COMMENT`
--

DROP TABLE IF EXISTS `TBL_BACKLOG_COMMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_BACKLOG_COMMENT` (
                                       `BACKLOG_COMMENT_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '댓글 번호',
                                       `BACKLOG_COMMENT_CONTENT` varchar(150) NOT NULL COMMENT '댓글내용',
                                       `BACKLOG_COMMENT_CREATED_DATE` varchar(30) NOT NULL COMMENT '작성일',
                                       `BACKLOG_COMMENT_MODIFIED_YN` varchar(30) NOT NULL DEFAULT 'N' COMMENT '수정여부',
                                       `BACKLOG_COMMENT_MODIFIED_DATE` varchar(30) DEFAULT NULL COMMENT '최근 편집일',
                                       `BACKLOG_COMMENT_DELETED_YN` varchar(30) NOT NULL DEFAULT 'N' COMMENT '삭제여부',
                                       `BACKLOG_CODE` mediumint(9) NOT NULL COMMENT '백로그 번호',
                                       `PROJECT_CODE` mediumint(9) NOT NULL COMMENT '프로젝트 번호',
                                       `MEMBER_CODE` mediumint(9) NOT NULL COMMENT '회원번호',
                                       PRIMARY KEY (`BACKLOG_COMMENT_CODE`),
                                       KEY `TBL_BACKLOG_COMMENT_FK` (`MEMBER_CODE`,`PROJECT_CODE`),
                                       KEY `TBL_BACKLOG_COMMENT_FK1` (`BACKLOG_CODE`),
                                       CONSTRAINT `TBL_BACKLOG_COMMENT_FK` FOREIGN KEY (`MEMBER_CODE`, `PROJECT_CODE`) REFERENCES `TBL_PROJECT_MEMBER` (`MEMBER_CODE`, `PROJECT_CODE`),
                                       CONSTRAINT `TBL_BACKLOG_COMMENT_FK1` FOREIGN KEY (`BACKLOG_CODE`) REFERENCES `TBL_BACKLOG` (`BACKLOG_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COMMENT='백로그 댓글';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_BACKLOG_COMMENT`
--

LOCK TABLES `TBL_BACKLOG_COMMENT` WRITE;
/*!40000 ALTER TABLE `TBL_BACKLOG_COMMENT` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_BACKLOG_COMMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_BACKLOG_COMMENT_HISTORY`
--

DROP TABLE IF EXISTS `TBL_BACKLOG_COMMENT_HISTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_BACKLOG_COMMENT_HISTORY` (
                                               `BACKLOG_COMMENT_HISTORY_CODE` mediumint(9) NOT NULL AUTO_INCREMENT,
                                               `BACKLOG_COMMENT_HISTORY_CONTENT` varchar(30) NOT NULL COMMENT '변경항목',
                                               `BACKLOG_HISTORY_DATE` varchar(30) NOT NULL COMMENT '이력발생일자',
                                               `BACKLOG_MODIFIED_COMMENT_DETAIL` varchar(150) DEFAULT NULL COMMENT '변경 상세내용',
                                               `BACKLOG_COMMENT_CODE` mediumint(9) NOT NULL COMMENT '댓글 번호',
                                               `PROJECT_CODE` mediumint(9) NOT NULL COMMENT '프로젝트 번호',
                                               `MEMBER_CODE` mediumint(9) NOT NULL COMMENT '회원번호',
                                               PRIMARY KEY (`BACKLOG_COMMENT_HISTORY_CODE`),
                                               KEY `TBL_BACKLOG_COMMENT_HISTORY_FK` (`BACKLOG_COMMENT_CODE`),
                                               KEY `TBL_BACKLOG_COMMENT_HISTORY_FK1` (`MEMBER_CODE`,`PROJECT_CODE`),
                                               CONSTRAINT `TBL_BACKLOG_COMMENT_HISTORY_FK` FOREIGN KEY (`BACKLOG_COMMENT_CODE`) REFERENCES `TBL_BACKLOG_COMMENT` (`BACKLOG_COMMENT_CODE`),
                                               CONSTRAINT `TBL_BACKLOG_COMMENT_HISTORY_FK1` FOREIGN KEY (`MEMBER_CODE`, `PROJECT_CODE`) REFERENCES `TBL_PROJECT_MEMBER` (`MEMBER_CODE`, `PROJECT_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8 COMMENT='백로그 댓글 히스토리';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_BACKLOG_COMMENT_HISTORY`
--

LOCK TABLES `TBL_BACKLOG_COMMENT_HISTORY` WRITE;
/*!40000 ALTER TABLE `TBL_BACKLOG_COMMENT_HISTORY` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_BACKLOG_COMMENT_HISTORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_BACKLOG_HISTORY`
--

DROP TABLE IF EXISTS `TBL_BACKLOG_HISTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_BACKLOG_HISTORY` (
                                       `BACKLOG_HISTORY_CODE` int(11) NOT NULL AUTO_INCREMENT,
                                       `BACKLOG_HISTORY_ITEM` varchar(30) DEFAULT NULL COMMENT '이력발생항목',
                                       `BACKLOG_HISTORY_CONTENT` varchar(150) NOT NULL COMMENT '이력발생내용',
                                       `BACKLOG_HISTORY_DATE` varchar(30) NOT NULL COMMENT '이력발생일자',
                                       `BACKLOG_CODE` mediumint(9) NOT NULL COMMENT '백로그 번호',
                                       `PROJECT_CODE` mediumint(9) NOT NULL COMMENT '프로젝트 번호',
                                       `MEMBER_CODE` mediumint(9) NOT NULL COMMENT '회원번호',
                                       PRIMARY KEY (`BACKLOG_HISTORY_CODE`),
                                       KEY `TBL_BACKLOG_HISOTRY_FK` (`BACKLOG_CODE`),
                                       KEY `TBL_BACKLOG_HISOTRY_FK1` (`MEMBER_CODE`,`PROJECT_CODE`),
                                       CONSTRAINT `TBL_BACKLOG_HISOTRY_FK` FOREIGN KEY (`BACKLOG_CODE`) REFERENCES `TBL_BACKLOG` (`BACKLOG_CODE`),
                                       CONSTRAINT `TBL_BACKLOG_HISOTRY_FK1` FOREIGN KEY (`MEMBER_CODE`, `PROJECT_CODE`) REFERENCES `TBL_PROJECT_MEMBER` (`MEMBER_CODE`, `PROJECT_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COMMENT='백로그 히스토리';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_BACKLOG_HISTORY`
--

LOCK TABLES `TBL_BACKLOG_HISTORY` WRITE;
/*!40000 ALTER TABLE `TBL_BACKLOG_HISTORY` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_BACKLOG_HISTORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_INQUIRY`
--

DROP TABLE IF EXISTS `TBL_INQUIRY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_INQUIRY` (
                               `INQUIRY_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '문의번호',
                               `INQUIRY_TITLE` varchar(30) NOT NULL COMMENT '문의제목',
                               `INQUIRY_CONTENT` varchar(500) NOT NULL COMMENT '문의내용',
                               `INQUIRY_CREATED_DATE` varchar(30) NOT NULL COMMENT '작성일',
                               `INQUIRY_DELETED_YN` varchar(30) NOT NULL DEFAULT 'N' COMMENT '삭제여부',
                               `INQUIRY_ANSWER_YN` varchar(30) NOT NULL DEFAULT 'N' COMMENT '답변상태',
                               `MEMBER_CODE` mediumint(9) NOT NULL COMMENT '회원번호',
                               `INQUIRY_CATEGORY_CODE` mediumint(9) NOT NULL COMMENT '문의유형 식별번호',
                               PRIMARY KEY (`INQUIRY_CODE`),
                               KEY `TBL_INQUIRY_FK` (`INQUIRY_CATEGORY_CODE`),
                               KEY `TBL_INQUIRY_FK1` (`MEMBER_CODE`),
                               CONSTRAINT `TBL_INQUIRY_FK` FOREIGN KEY (`INQUIRY_CATEGORY_CODE`) REFERENCES `TBL_INQUIRY_CATEGORY` (`INQUIRY_CATEGORY_CODE`),
                               CONSTRAINT `TBL_INQUIRY_FK1` FOREIGN KEY (`MEMBER_CODE`) REFERENCES `TBL_MEMBER` (`MEMBER_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COMMENT='1:1문의';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_INQUIRY`
--

LOCK TABLES `TBL_INQUIRY` WRITE;
/*!40000 ALTER TABLE `TBL_INQUIRY` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_INQUIRY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_INQUIRY_CATEGORY`
--

DROP TABLE IF EXISTS `TBL_INQUIRY_CATEGORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_INQUIRY_CATEGORY` (
                                        `INQUIRY_CATEGORY_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '문의유형 식별번호',
                                        `INQUIRY_CATEGORY_NAME` varchar(30) NOT NULL COMMENT '문의 유형명',
                                        PRIMARY KEY (`INQUIRY_CATEGORY_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COMMENT='문의 유형';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_INQUIRY_CATEGORY`
--

LOCK TABLES `TBL_INQUIRY_CATEGORY` WRITE;
/*!40000 ALTER TABLE `TBL_INQUIRY_CATEGORY` DISABLE KEYS */;
INSERT INTO `TBL_INQUIRY_CATEGORY` VALUES (1,'일반'),(2,'버그신고'),(3,'결제 및 환불'),(4,'건의사항');
/*!40000 ALTER TABLE `TBL_INQUIRY_CATEGORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_INQUIRY_COMMENT`
--

DROP TABLE IF EXISTS `TBL_INQUIRY_COMMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_INQUIRY_COMMENT` (
                                       `INQUIRY_COMMENT_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '댓글번호',
                                       `INQUIRY_COMMENT_CONTENT` varchar(500) NOT NULL COMMENT '작성내용',
                                       `INQUIRY_COMMENT_MODIFIED_DATE` varchar(30) NOT NULL COMMENT '최근편집일',
                                       `INQUIRY_COMMENT_MODIFIED_YN` varchar(30) NOT NULL DEFAULT 'N' COMMENT '수정여부',
                                       `INQUIRY_COMMENT_DELETED_YN` varchar(30) NOT NULL DEFAULT 'N' COMMENT '삭제여부',
                                       `INQUIRY_CODE` mediumint(9) NOT NULL COMMENT '문의번호',
                                       `MEMBER_CODE` mediumint(9) NOT NULL COMMENT '회원번호',
                                       PRIMARY KEY (`INQUIRY_COMMENT_CODE`),
                                       KEY `TBL_INQUIRY_COMMENT_FK` (`INQUIRY_CODE`),
                                       KEY `TBL_INQUIRY_COMMENT_FK2` (`MEMBER_CODE`),
                                       CONSTRAINT `TBL_INQUIRY_COMMENT_FK` FOREIGN KEY (`INQUIRY_CODE`) REFERENCES `TBL_INQUIRY` (`INQUIRY_CODE`),
                                       CONSTRAINT `TBL_INQUIRY_COMMENT_FK1` FOREIGN KEY (`MEMBER_CODE`) REFERENCES `TBL_MEMBER` (`MEMBER_CODE`),
                                       CONSTRAINT `TBL_INQUIRY_COMMENT_FK2` FOREIGN KEY (`MEMBER_CODE`) REFERENCES `TBL_MEMBER` (`MEMBER_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COMMENT='1:1문의 댓글';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_INQUIRY_COMMENT`
--

LOCK TABLES `TBL_INQUIRY_COMMENT` WRITE;
/*!40000 ALTER TABLE `TBL_INQUIRY_COMMENT` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_INQUIRY_COMMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_INQUIRY_COMMENT_HISTORY`
--

DROP TABLE IF EXISTS `TBL_INQUIRY_COMMENT_HISTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_INQUIRY_COMMENT_HISTORY` (
                                               `INQUIRY_COMMENT_HISTORY_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '이력번호',
                                               `INQUIRY_COMMENT_MODIFIED_CONTENT` varchar(150) NOT NULL COMMENT '변경내용',
                                               `INQUIRY_COMMENT_CODE` mediumint(9) NOT NULL COMMENT '댓글번호',
                                               `MEMBER_CODE` mediumint(9) NOT NULL COMMENT '회원번호',
                                               `INQUIRY_COMMENT_HISTORY_DATE` varchar(30) NOT NULL COMMENT '이력발생일',
                                               PRIMARY KEY (`INQUIRY_COMMENT_HISTORY_CODE`),
                                               KEY `TBL_INQUIRY_COMMENT_HISTORY_FK` (`INQUIRY_COMMENT_CODE`),
                                               KEY `TBL_INQUIRY_COMMENT_HISTORY_FK2` (`MEMBER_CODE`),
                                               CONSTRAINT `TBL_INQUIRY_COMMENT_HISTORY_FK` FOREIGN KEY (`INQUIRY_COMMENT_CODE`) REFERENCES `TBL_INQUIRY_COMMENT` (`INQUIRY_COMMENT_CODE`),
                                               CONSTRAINT `TBL_INQUIRY_COMMENT_HISTORY_FK1` FOREIGN KEY (`MEMBER_CODE`) REFERENCES `TBL_MEMBER` (`MEMBER_CODE`),
                                               CONSTRAINT `TBL_INQUIRY_COMMENT_HISTORY_FK2` FOREIGN KEY (`MEMBER_CODE`) REFERENCES `TBL_MEMBER` (`MEMBER_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COMMENT='1:1문의 댓글 히스토리';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_INQUIRY_COMMENT_HISTORY`
--

LOCK TABLES `TBL_INQUIRY_COMMENT_HISTORY` WRITE;
/*!40000 ALTER TABLE `TBL_INQUIRY_COMMENT_HISTORY` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_INQUIRY_COMMENT_HISTORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_INQUIRY_HISTORY`
--

DROP TABLE IF EXISTS `TBL_INQUIRY_HISTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_INQUIRY_HISTORY` (
                                       `INQUIRY_HISTORY_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '이력번호',
                                       `INQUIRY_HISTORY_DATE` varchar(30) NOT NULL COMMENT '이력발생일',
                                       `INQUIRY_HISTORY_CONTENT` varchar(30) NOT NULL COMMENT '이력발생 항목',
                                       `INQUIRY_MODIFIED_CONTENT_DETAIL` varchar(500) NOT NULL COMMENT '변경상세내용',
                                       `INQUIRY_CODE` mediumint(9) NOT NULL COMMENT '문의번호',
                                       `MEMBER_CODE` mediumint(9) NOT NULL COMMENT '회원번호',
                                       PRIMARY KEY (`INQUIRY_HISTORY_CODE`),
                                       KEY `TBL_INQUIRY_HISTORY_FK` (`INQUIRY_CODE`),
                                       KEY `TBL_INQUIRY_HISTORY_FK1` (`MEMBER_CODE`),
                                       CONSTRAINT `TBL_INQUIRY_HISTORY_FK` FOREIGN KEY (`INQUIRY_CODE`) REFERENCES `TBL_INQUIRY` (`INQUIRY_CODE`),
                                       CONSTRAINT `TBL_INQUIRY_HISTORY_FK1` FOREIGN KEY (`MEMBER_CODE`) REFERENCES `TBL_MEMBER` (`MEMBER_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COMMENT='1:1문의 히스토리';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_INQUIRY_HISTORY`
--

LOCK TABLES `TBL_INQUIRY_HISTORY` WRITE;
/*!40000 ALTER TABLE `TBL_INQUIRY_HISTORY` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_INQUIRY_HISTORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_MEMBER`
--

DROP TABLE IF EXISTS `TBL_MEMBER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_MEMBER` (
                              `MEMBER_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '회원번호',
                              `MEMBER_ID` varchar(30) NOT NULL COMMENT '아이디',
                              `MEMBER_PASSWORD` varchar(150) DEFAULT NULL,
                              `MEMBER_EMAIL` varchar(30) NOT NULL COMMENT '이메일주소',
                              `MEMBER_PHONE` varchar(30) NOT NULL COMMENT '전화번호',
                              `MEMBER_CREATED_DATE` varchar(30) NOT NULL COMMENT '가입일',
                              `MEMBER_ROLE` varchar(30) NOT NULL COMMENT '역할',
                              `MEMBER_SECESSION_YN` varchar(30) NOT NULL DEFAULT 'N' COMMENT '회원탈퇴상태',
                              `MEMBER_COMPANY` varchar(30) DEFAULT NULL COMMENT '회사이름',
                              `MEMBER_OCCUPATION` varchar(30) DEFAULT NULL COMMENT '직업',
                              `MEMBER_PURPOSE` varchar(1000) DEFAULT NULL COMMENT '가입목적',
                              `MEMBER_NAME` varchar(45) NOT NULL,
                              `MEMBER_EMAIL_AUTH` varchar(5) DEFAULT 'N',
                              PRIMARY KEY (`MEMBER_CODE`),
                              UNIQUE KEY `TBL_MEMBER_MEMBER_EMAIL_IDX` (`MEMBER_EMAIL`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COMMENT='회원';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_MEMBER`
--

LOCK TABLES `TBL_MEMBER` WRITE;
/*!40000 ALTER TABLE `TBL_MEMBER` DISABLE KEYS */;
INSERT INTO `TBL_MEMBER` VALUES (1,'wujin','$2b$10$bsbtIoXolODi5cHyGK2xROxhJwcJn/ZAhj3x/.QEipn.GlLG.nvtS','whagile001@kakao.com','010-5121-2222','2022-06-25 05:42:17','ROLE_USER','N',NULL,'DBA','프로젝트','우진','Y'),(2,'seongjun','$2b$10$IjGLqU.lIOypGUThqo.AJe.eMASc1h8R4DFMXsMM9P5PN4lVX1ajO','myrhymetree@gmail.com','010-5152-1233','2022-06-25 05:42:17','ROLE_USER','N',NULL,'형상관리자','프로젝트','성준','Y'),(3,'minjoo','$2b$10$RpQz0HgTQ0oy71jW9dI/7OOHGSEd6rKNPmXfDUq.0b4APQNIafp6q','whagile003@kakao.com','010-1234-1234','2022-06-25 05:42:17','ROLE_USER','N',NULL,'CTO','프로젝트','민주','Y'),(4,'hansol','$2b$10$s/ibQbSFPi1dAUtXQ2Nee.tBvzik9xPQaNdlaEkv1AAZfyhnTBr.K','whagile004@kakao.com','010-9856-7675','2022-06-25 05:42:17','ROLE_USER','N',NULL,'형상관리자','프로젝트','한솔','Y'),(5,'hosung','$2b$10$xbpauIka3IAJnMowI0NXP.99QH1u1YnOrJSneyGlIrtmBFU7oiAw.','dunjun10@naver.com','010-1234-1234','2022-06-25 05:42:17','ROLE_USER','N','','DBA','','호성','Y'),(6,'admin','$2b$10$s/ibQbSFPi1dAUtXQ2Nee.tBvzik9xPQaNdlaEkv1AAZfyhnTBr.K','admin@myrhyemetree.me','010-5121-2222','2022-06-25 07:26:17','ROLE_ADMIN','N',NULL,'ADMIN','관리','관리자','Y');
/*!40000 ALTER TABLE `TBL_MEMBER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_MEMBER_HISTORY`
--

DROP TABLE IF EXISTS `TBL_MEMBER_HISTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_MEMBER_HISTORY` (
                                      `MEMBER_HISTORY_CODE` mediumint(9) NOT NULL AUTO_INCREMENT,
                                      `MEMBER_CODE` mediumint(9) NOT NULL COMMENT '회원번호',
                                      `MEMBER_PREVIOUS_CONTENT` varchar(200) NOT NULL COMMENT '변경 전 내용',
                                      `MEMBER_MODIFIED_DATE` varchar(30) NOT NULL COMMENT '변경발생일',
                                      `MEMBER_MODIFIED_ITEM` varchar(30) NOT NULL COMMENT '변경항목',
                                      PRIMARY KEY (`MEMBER_HISTORY_CODE`),
                                      KEY `TBL_MEMBER_HISTORY_FK` (`MEMBER_CODE`),
                                      CONSTRAINT `TBL_MEMBER_HISTORY_FK` FOREIGN KEY (`MEMBER_CODE`) REFERENCES `TBL_MEMBER` (`MEMBER_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COMMENT='회원정보변경이력';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_MEMBER_HISTORY`
--

LOCK TABLES `TBL_MEMBER_HISTORY` WRITE;
/*!40000 ALTER TABLE `TBL_MEMBER_HISTORY` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_MEMBER_HISTORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_MEMBER_PRODUCT`
--

DROP TABLE IF EXISTS `TBL_MEMBER_PRODUCT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_MEMBER_PRODUCT` (
                                      `MEMBER_PRODUCT_YN` varchar(30) NOT NULL DEFAULT 'N' COMMENT '이용상태',
                                      `PRODUCT_START_DATE` varchar(30) NOT NULL COMMENT '시작일',
                                      `PRODUCT_END_DATE` varchar(30) NOT NULL COMMENT '종료일',
                                      `MEMBER_PRODUCT_CODE` mediumint(9) NOT NULL AUTO_INCREMENT,
                                      `PRODUCT_CODE` mediumint(9) NOT NULL COMMENT '상품 번호',
                                      `MEMBER_CODE` mediumint(9) NOT NULL COMMENT '회원번호',
                                      PRIMARY KEY (`MEMBER_PRODUCT_CODE`),
                                      KEY `TBL_MEMBER_PRODUCT_FK` (`MEMBER_CODE`),
                                      KEY `TBL_MEMBER_PRODUCT_FK1` (`PRODUCT_CODE`),
                                      CONSTRAINT `TBL_MEMBER_PRODUCT_FK` FOREIGN KEY (`MEMBER_CODE`) REFERENCES `TBL_MEMBER` (`MEMBER_CODE`),
                                      CONSTRAINT `TBL_MEMBER_PRODUCT_FK1` FOREIGN KEY (`PRODUCT_CODE`) REFERENCES `TBL_PRODUCT` (`PRODUCT_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COMMENT='회원 이용 상품';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_MEMBER_PRODUCT`
--

LOCK TABLES `TBL_MEMBER_PRODUCT` WRITE;
/*!40000 ALTER TABLE `TBL_MEMBER_PRODUCT` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_MEMBER_PRODUCT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_NOTICE`
--

DROP TABLE IF EXISTS `TBL_NOTICE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_NOTICE` (
                              `NOTICE_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '공지 식별번호',
                              `NOTICE_DATE` varchar(30) DEFAULT NULL COMMENT '공지일자',
                              `NOTICE_CONTENT` varchar(1000) NOT NULL COMMENT '공지 내용',
                              `NOTICE_CREATED_DATE` varchar(30) NOT NULL COMMENT '생성일',
                              `NOTICE_END_DATE` varchar(30) DEFAULT NULL COMMENT '종료일',
                              `CREATOR` mediumint(9) NOT NULL COMMENT '작성자',
                              `PROJECT_CODE` mediumint(9) DEFAULT NULL COMMENT '프로젝트 번호',
                              `MODIFIER` mediumint(9) DEFAULT NULL COMMENT '수정자',
                              PRIMARY KEY (`NOTICE_CODE`),
                              KEY `TBL_NOTICE_FK` (`CREATOR`),
                              CONSTRAINT `TBL_NOTICE_FK` FOREIGN KEY (`CREATOR`) REFERENCES `TBL_MEMBER` (`MEMBER_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='공지';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_NOTICE`
--

LOCK TABLES `TBL_NOTICE` WRITE;
/*!40000 ALTER TABLE `TBL_NOTICE` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_NOTICE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_PAYMENT`
--

DROP TABLE IF EXISTS `TBL_PAYMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_PAYMENT` (
                               `PAYMENT_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '결제번호',
                               `PAYMENT_DATE` varchar(30) NOT NULL COMMENT '결제요청일(보류)',
                               `PAYMENT_AMOUNT` mediumint(9) NOT NULL COMMENT '결제금액',
                               `PRODUCT_CODE` mediumint(9) NOT NULL COMMENT '상품 번호',
                               `CARD_APPROVAL_CODE` longtext COMMENT '카드 승인 번호',
                               `MEMBER_CODE` mediumint(9) NOT NULL COMMENT '회원번호',
                               PRIMARY KEY (`PAYMENT_CODE`),
                               KEY `TBL_PAYMENT_FK` (`MEMBER_CODE`),
                               KEY `TBL_PAYMENT_FK1` (`PRODUCT_CODE`),
                               CONSTRAINT `TBL_PAYMENT_FK` FOREIGN KEY (`MEMBER_CODE`) REFERENCES `TBL_MEMBER` (`MEMBER_CODE`),
                               CONSTRAINT `TBL_PAYMENT_FK1` FOREIGN KEY (`PRODUCT_CODE`) REFERENCES `TBL_PRODUCT` (`PRODUCT_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='회원별 결제정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_PAYMENT`
--

LOCK TABLES `TBL_PAYMENT` WRITE;
/*!40000 ALTER TABLE `TBL_PAYMENT` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_PAYMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_PAYMENT_HISTORY`
--

DROP TABLE IF EXISTS `TBL_PAYMENT_HISTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_PAYMENT_HISTORY` (
                                       `PAYMENT_HISTORY_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '이력번호',
                                       `PAYMENT_HISTORY_DATE` char(30) NOT NULL COMMENT '이력발생일',
                                       `PAYMENT_STATUS_YN` varchar(30) NOT NULL DEFAULT 'N' COMMENT '상태',
                                       `REFUND_IDENTIFICATION_CODE` mediumint(9) DEFAULT NULL COMMENT '환불식별번호',
                                       `PAYMENT_CODE` mediumint(9) NOT NULL COMMENT '결제번호',
                                       PRIMARY KEY (`PAYMENT_HISTORY_CODE`),
                                       KEY `TBL_PAYMENT_HISTORY_FK` (`REFUND_IDENTIFICATION_CODE`),
                                       KEY `TBL_PAYMENT_HISTORY_FK1` (`PAYMENT_CODE`),
                                       CONSTRAINT `TBL_PAYMENT_HISTORY_FK` FOREIGN KEY (`REFUND_IDENTIFICATION_CODE`) REFERENCES `TBL_REFUND` (`REFUND_IDENTIFICATION_CODE`),
                                       CONSTRAINT `TBL_PAYMENT_HISTORY_FK1` FOREIGN KEY (`PAYMENT_CODE`) REFERENCES `TBL_PAYMENT` (`PAYMENT_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='결제내역 히스토리';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_PAYMENT_HISTORY`
--

LOCK TABLES `TBL_PAYMENT_HISTORY` WRITE;
/*!40000 ALTER TABLE `TBL_PAYMENT_HISTORY` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_PAYMENT_HISTORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_PRODUCT`
--

DROP TABLE IF EXISTS `TBL_PRODUCT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_PRODUCT` (
                               `PRODUCT_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '상품 번호',
                               `PRODUCT_TITLE` varchar(30) NOT NULL COMMENT '상품 제목',
                               `PRODUCT_COTENT` varchar(150) NOT NULL COMMENT '상품 내용',
                               `PRODUCT_PRICE` mediumint(9) NOT NULL COMMENT '상품 가격',
                               `PRODUCT_ACTIVATED_YN` varchar(5) NOT NULL DEFAULT 'N' COMMENT '상품 활성화 여부',
                               `PRODUCT_ORDER` mediumint(9) NOT NULL COMMENT '상품 순서',
                               `PRODUCT_DISCOUNT_RATE` mediumint(9) NOT NULL COMMENT '상품 할인율',
                               `PRODUCT_PERIOD` varchar(30) NOT NULL COMMENT '상품 기간',
                               PRIMARY KEY (`PRODUCT_CODE`),
                               UNIQUE KEY `TBL_PRODUCT_UK` (`PRODUCT_ORDER`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COMMENT='상품';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_PRODUCT`
--

LOCK TABLES `TBL_PRODUCT` WRITE;
/*!40000 ALTER TABLE `TBL_PRODUCT` DISABLE KEYS */;
INSERT INTO `TBL_PRODUCT` VALUES (1,'3개월 이용권','3개월 동안 웨자일 이용할 수 있습니다',49000,'Y',1,0,'90일'),(2,'6개월 이용권','6개월 동안 웨자일 이용할 수 있습니다',99000,'Y',2,0,'180일'),(3,'12개월 이용권','12개월 동안 웨자일 이용할 수 있습니다',199000,'Y',3,0,'365일');
/*!40000 ALTER TABLE `TBL_PRODUCT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_PROJECT`
--

DROP TABLE IF EXISTS `TBL_PROJECT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_PROJECT` (
                               `PROJECT_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '프로젝트 번호',
                               `PROJECT_NAME` varchar(30) NOT NULL COMMENT '프로젝트 이름',
                               `PROJECT_DESCRIPTION` varchar(1000) NOT NULL COMMENT '프로젝트 설명',
                               `PROJECT_DELETED_STATUS` varchar(30) NOT NULL DEFAULT 'N' COMMENT '삭제 상태',
                               PRIMARY KEY (`PROJECT_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8mb4 COMMENT='프로젝트';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_PROJECT`
--

LOCK TABLES `TBL_PROJECT` WRITE;
/*!40000 ALTER TABLE `TBL_PROJECT` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_PROJECT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_PROJECT_HISTORY`
--

DROP TABLE IF EXISTS `TBL_PROJECT_HISTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_PROJECT_HISTORY` (
                                       `PROJECT_HISTORY_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '이력번호',
                                       `PROJECT_HISTORY_NAME` varchar(30) NOT NULL COMMENT '이력 이름',
                                       `PROJECT_HISTORY_CONTENT` varchar(150) NOT NULL COMMENT '이력 발생내용',
                                       `PROJECT_HISTORY_DATE` varchar(30) NOT NULL COMMENT '이력 발생시간',
                                       `PROJECT_HISTORY_STATUS` varchar(30) NOT NULL DEFAULT 'N' COMMENT '이력 상태',
                                       `PROJECT_CODE` mediumint(9) NOT NULL COMMENT '프로젝트 번호',
                                       `MEMBER_CODE` mediumint(9) NOT NULL COMMENT '회원번호',
                                       PRIMARY KEY (`PROJECT_HISTORY_CODE`),
                                       KEY `TBL_PROJECT_HISTORY_FK` (`MEMBER_CODE`,`PROJECT_CODE`),
                                       KEY `TBL_PROJECT_HISTORY_FK1` (`PROJECT_CODE`),
                                       CONSTRAINT `TBL_PROJECT_HISTORY_FK` FOREIGN KEY (`MEMBER_CODE`, `PROJECT_CODE`) REFERENCES `TBL_PROJECT_MEMBER` (`MEMBER_CODE`, `PROJECT_CODE`),
                                       CONSTRAINT `TBL_PROJECT_HISTORY_FK1` FOREIGN KEY (`PROJECT_CODE`) REFERENCES `TBL_PROJECT` (`PROJECT_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COMMENT='프로젝트 이력';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_PROJECT_HISTORY`
--

LOCK TABLES `TBL_PROJECT_HISTORY` WRITE;
/*!40000 ALTER TABLE `TBL_PROJECT_HISTORY` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_PROJECT_HISTORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_PROJECT_MEMBER`
--

DROP TABLE IF EXISTS `TBL_PROJECT_MEMBER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_PROJECT_MEMBER` (
                                      `MEMBER_CODE` mediumint(9) NOT NULL COMMENT '회원번호',
                                      `AUTHORITY_CODE` mediumint(9) NOT NULL COMMENT '권한번호',
                                      `PROJECT_CODE` mediumint(9) NOT NULL COMMENT '프로젝트 번호',
                                      `PROJECT_MEMBER_DELETED_YN` varchar(30) NOT NULL DEFAULT 'N',
                                      PRIMARY KEY (`MEMBER_CODE`,`PROJECT_CODE`),
                                      KEY `TBL_PROJECT_MEMBER_FK` (`AUTHORITY_CODE`),
                                      KEY `TBL_PROJECT_MEMBER_FK2` (`PROJECT_CODE`),
                                      CONSTRAINT `TBL_PROJECT_MEMBER_FK` FOREIGN KEY (`AUTHORITY_CODE`) REFERENCES `TBL_AUTHORITY` (`AUTHORITY_CODE`),
                                      CONSTRAINT `TBL_PROJECT_MEMBER_FK1` FOREIGN KEY (`MEMBER_CODE`) REFERENCES `TBL_MEMBER` (`MEMBER_CODE`),
                                      CONSTRAINT `TBL_PROJECT_MEMBER_FK2` FOREIGN KEY (`PROJECT_CODE`) REFERENCES `TBL_PROJECT` (`PROJECT_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='프로젝트 별 참여 회원';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_PROJECT_MEMBER`
--

LOCK TABLES `TBL_PROJECT_MEMBER` WRITE;
/*!40000 ALTER TABLE `TBL_PROJECT_MEMBER` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_PROJECT_MEMBER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_REFUND`
--

DROP TABLE IF EXISTS `TBL_REFUND`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_REFUND` (
                              `REFUND_IDENTIFICATION_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '환불식별번호',
                              `REFUND_PROGRESS_STATUS` varchar(30) NOT NULL COMMENT '환불 진행상태',
                              `REFUND_REQUESTED_DATE` varchar(30) NOT NULL COMMENT '환불 요청 일시',
                              `REFUND_CONFIRMED_DATE` varchar(30) NOT NULL COMMENT '환불 확정 일시',
                              `REFUND_RESULT_YN` varchar(30) NOT NULL DEFAULT 'N' COMMENT '환불 처리 결과',
                              `REFUND_REASON` varchar(150) NOT NULL COMMENT '환불 사유',
                              `MEMBER_USED_PRODUCT_DATE` varchar(30) NOT NULL COMMENT '상품 이용기간',
                              `REFUND_REJECT_REASON` varchar(1000) DEFAULT NULL,
                              `MEMBER_CODE` mediumint(9) NOT NULL COMMENT '회원번호',
                              PRIMARY KEY (`REFUND_IDENTIFICATION_CODE`),
                              KEY `TBL_REFUND_FK` (`MEMBER_CODE`),
                              CONSTRAINT `TBL_REFUND_FK` FOREIGN KEY (`MEMBER_CODE`) REFERENCES `TBL_MEMBER` (`MEMBER_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='환불요청';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_REFUND`
--

LOCK TABLES `TBL_REFUND` WRITE;
/*!40000 ALTER TABLE `TBL_REFUND` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_REFUND` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_REFUND_HISTORY`
--

DROP TABLE IF EXISTS `TBL_REFUND_HISTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_REFUND_HISTORY` (
                                      `REFUND_HISTORY_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '이력번호',
                                      `REFUND_MODIFIED_ITEM` varchar(30) NOT NULL COMMENT '변경항목',
                                      `REFUND_PREVIOUS_CONTENT` varchar(200) NOT NULL COMMENT '변경 전 내용',
                                      `REFUND_HISTORY_DATE` varchar(30) NOT NULL COMMENT '이력발생일',
                                      `REFUND_IDENTIFICATION_CODE` mediumint(9) NOT NULL COMMENT '환불식별번호',
                                      PRIMARY KEY (`REFUND_HISTORY_CODE`),
                                      KEY `TBL_REFUND_HISTORY_FK` (`REFUND_IDENTIFICATION_CODE`),
                                      CONSTRAINT `TBL_REFUND_HISTORY_FK` FOREIGN KEY (`REFUND_IDENTIFICATION_CODE`) REFERENCES `TBL_REFUND` (`REFUND_IDENTIFICATION_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='환불 히스토리';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_REFUND_HISTORY`
--

LOCK TABLES `TBL_REFUND_HISTORY` WRITE;
/*!40000 ALTER TABLE `TBL_REFUND_HISTORY` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_REFUND_HISTORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_SPRINT`
--

DROP TABLE IF EXISTS `TBL_SPRINT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_SPRINT` (
                              `SPRINT_CODE` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '스프린트번호',
                              `SPRINT_NAME` varchar(30) NOT NULL COMMENT '스프린트이름',
                              `SPRINT_TARGET` varchar(150) DEFAULT NULL COMMENT '스프린트목표',
                              `SPRINT_START_DATE` varchar(30) DEFAULT NULL COMMENT '시작일',
                              `SPRINT_END_DATE` varchar(30) DEFAULT NULL COMMENT '종료일',
                              `SPRINT_PROGRESS_STATUS` varchar(30) NOT NULL COMMENT '진행상태',
                              `SPRINT_DELETED_YN` varchar(30) NOT NULL DEFAULT 'N' COMMENT '삭제여부',
                              `PROJECT_CODE` mediumint(9) NOT NULL COMMENT '프로젝트 번호',
                              PRIMARY KEY (`SPRINT_CODE`),
                              KEY `TBL_SPRINT_FK` (`PROJECT_CODE`),
                              CONSTRAINT `TBL_SPRINT_FK` FOREIGN KEY (`PROJECT_CODE`) REFERENCES `TBL_PROJECT_MEMBER` (`PROJECT_CODE`),
                              CONSTRAINT `TBL_SPRINT_FK1` FOREIGN KEY (`PROJECT_CODE`) REFERENCES `TBL_PROJECT` (`PROJECT_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COMMENT='스프린트';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_SPRINT`
--

LOCK TABLES `TBL_SPRINT` WRITE;
/*!40000 ALTER TABLE `TBL_SPRINT` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_SPRINT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_SPRINT_HISTORY`
--

DROP TABLE IF EXISTS `TBL_SPRINT_HISTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_SPRINT_HISTORY` (
                                      `SPRINT_HISTORY_CODE` mediumint(9) NOT NULL AUTO_INCREMENT,
                                      `SPRINT_HISTORY_ITEM` varchar(30) DEFAULT NULL COMMENT '스프린트이력발생항목',
                                      `SPRINT_HISTORY_CONTENT` varchar(150) DEFAULT NULL COMMENT '스프린트이력발생내용',
                                      `SPRINT_HISTORY_DATE` varchar(30) NOT NULL COMMENT '스프린트이력발생시간',
                                      `SPRINT_CODE` mediumint(9) NOT NULL COMMENT '스프린트번호',
                                      `MEMBER_CODE` mediumint(9) NOT NULL,
                                      `PROJECT_CODE` mediumint(9) DEFAULT NULL,
                                      PRIMARY KEY (`SPRINT_HISTORY_CODE`,`MEMBER_CODE`),
                                      KEY `TBL_SPRINT_HISTORY_FK` (`SPRINT_CODE`),
                                      CONSTRAINT `TBL_SPRINT_HISTORY_FK` FOREIGN KEY (`SPRINT_CODE`) REFERENCES `TBL_SPRINT` (`SPRINT_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COMMENT='스프린트이력';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_SPRINT_HISTORY`
--

LOCK TABLES `TBL_SPRINT_HISTORY` WRITE;
/*!40000 ALTER TABLE `TBL_SPRINT_HISTORY` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_SPRINT_HISTORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TBL_SPRINT_USER`
--

DROP TABLE IF EXISTS `TBL_SPRINT_USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TBL_SPRINT_USER` (
                                   `MEMBER_CODE` mediumint(9) NOT NULL COMMENT '회원번호',
                                   `PROJECT_CODE` mediumint(9) NOT NULL COMMENT '프로젝트 번호',
                                   `SPRINT_CODE` mediumint(9) NOT NULL COMMENT '스프린트번호',
                                   PRIMARY KEY (`MEMBER_CODE`,`PROJECT_CODE`),
                                   KEY `TBL_PROJECT_USER_FK` (`PROJECT_CODE`),
                                   KEY `TBL_SPRINT_USER_FK` (`SPRINT_CODE`),
                                   CONSTRAINT `TBL_MEMBER_USER_FK` FOREIGN KEY (`MEMBER_CODE`) REFERENCES `TBL_PROJECT_MEMBER` (`MEMBER_CODE`),
                                   CONSTRAINT `TBL_PROJECT_USER_FK` FOREIGN KEY (`PROJECT_CODE`) REFERENCES `TBL_PROJECT_MEMBER` (`PROJECT_CODE`),
                                   CONSTRAINT `TBL_SPRINT_USER_FK` FOREIGN KEY (`SPRINT_CODE`) REFERENCES `TBL_SPRINT` (`SPRINT_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='스프린트 참여자';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TBL_SPRINT_USER`
--

LOCK TABLES `TBL_SPRINT_USER` WRITE;
/*!40000 ALTER TABLE `TBL_SPRINT_USER` DISABLE KEYS */;
/*!40000 ALTER TABLE `TBL_SPRINT_USER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-16  9:47:57
