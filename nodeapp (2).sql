-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 25, 2020 at 12:31 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodeapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `bike`
--

DROP TABLE IF EXISTS `bike`;
CREATE TABLE IF NOT EXISTS `bike` (
  `bike_id` int(11) NOT NULL AUTO_INCREMENT,
  `model` text NOT NULL,
  `type` text NOT NULL,
  `price` text NOT NULL,
  `shop_id` int(11) NOT NULL,
  `image` text NOT NULL,
  PRIMARY KEY (`bike_id`),
  KEY `shop_id` (`shop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bike`
--

INSERT INTO `bike` (`bike_id`, `model`, `type`, `price`, `shop_id`, `image`) VALUES
(1, 'rrrr', 'rtt', '15', 1, 'bike.png'),
(2, 'bbbbbbbbbb', 'Sport', '24', 2, 'bike2.png'),
(3, 'Skygrey', 'RTT', '55', 1, 'bike3.png'),
(4, 'ttttt', 'Cross', '12', 2, 'bike4.png');

-- --------------------------------------------------------

--
-- Table structure for table `circuit`
--

DROP TABLE IF EXISTS `circuit`;
CREATE TABLE IF NOT EXISTS `circuit` (
  `circuit_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  PRIMARY KEY (`circuit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `circuit`
--

INSERT INTO `circuit` (`circuit_id`, `title`, `latitude`, `longitude`) VALUES
(1, 'Circuit 1', 33.773035, 10.857805),
(2, 'Circuit 2 ', 36.882526, 8.95717),
(3, 'Circuit 3', 36.574341, 8.429827);

-- --------------------------------------------------------

--
-- Table structure for table `community`
--

DROP TABLE IF EXISTS `community`;
CREATE TABLE IF NOT EXISTS `community` (
  `community_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  PRIMARY KEY (`community_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `community`
--

INSERT INTO `community` (`community_id`, `title`, `latitude`, `longitude`) VALUES
(1, 'Bike Community 1', 37.276943, 9.748186),
(2, 'Bike Community 2', 35.427828, 10.934709),
(3, 'Bike Community 3', 36.140808, 8.847307);

-- --------------------------------------------------------

--
-- Table structure for table `cyclist`
--

DROP TABLE IF EXISTS `cyclist`;
CREATE TABLE IF NOT EXISTS `cyclist` (
  `cyclist_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  PRIMARY KEY (`cyclist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cyclist`
--

INSERT INTO `cyclist` (`cyclist_id`, `title`, `latitude`, `longitude`) VALUES
(1, 'Bike Cyclist 1', 35.785118, 10.000871),
(2, 'Bike Cyclist 2', 36.9001, 10.90175),
(3, 'Bike Cyclist 3', 35.900893, 9.154924);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
CREATE TABLE IF NOT EXISTS `location` (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `datelocation` text NOT NULL,
  `adresselocation` text NOT NULL,
  `totalprice` text NOT NULL,
  `hours` text NOT NULL,
  `bike_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`location_id`),
  KEY `bike_id` (`bike_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `datelocation`, `adresselocation`, `totalprice`, `hours`, `bike_id`, `user_id`) VALUES
(1, '12/11/10', 'la Marsa', '70', '5', 2, 1),
(5, '11/02/2020 11:44', 'toulouse', '220', '24', 3, 10),
(11, '17-12-2020 09:27', 'Nabeul', '150', '10', 1, 10),
(12, '17-12-2020 09:42', 'Marsa', '150', '10', 1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `record`
--

DROP TABLE IF EXISTS `record`;
CREATE TABLE IF NOT EXISTS `record` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `address` text NOT NULL,
  `time` text NOT NULL,
  `distance` text NOT NULL,
  `daterecord` text NOT NULL,
  `user_id` text NOT NULL,
  PRIMARY KEY (`record_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `record`
--

INSERT INTO `record` (`record_id`, `address`, `time`, `distance`, `daterecord`, `user_id`) VALUES
(4, 'Marseille', '22', '55', '06-12-2020 18:16', '10'),
(5, 'Charguia', '120', '10', '17-12-2020 09:29', '10');

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
CREATE TABLE IF NOT EXISTS `shop` (
  `shop_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  PRIMARY KEY (`shop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`shop_id`, `title`, `latitude`, `longitude`) VALUES
(1, 'Bike Shop 1', 36.553015, 10.592774),
(2, 'Bike Shop 2', 35.499414, 10.824846),
(3, 'Bike Shop 3', 35.945377, 9.451555);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `lastname` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `phone` text NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `lastname`, `email`, `password`, `phone`) VALUES
(1, 'aaaaaaaaaa', 'vvvvvvvvvvvvv', 'f@dsdds.com', '123456', '97475414'),
(2, 'aaaaaaaaaa', 'vvvvvvvvvvvvv', 'f@dss.com', '123456', '97475414'),
(3, 'aaaaaaaaaa', 'vvvvvvvvvvvvv', 'f@dsbvcs.com', '123456', '97475414'),
(4, 'aaaaaaaaaa', 'vvvvvvvvvvvvv', 'f@dsddse.com', '123456', '97475414'),
(5, 'aaaaaaaaaa', 'vvvvvvvvvvvvv', 'f@dsddsex.com', '123456', '97475414'),
(6, 'sadasda', 'fadsa', 'fares@fares.com', '123456', '73333333'),
(7, 'sadasda', 'fadsa', 'fares@farese.com', '123456', '73333333'),
(8, 'sadasd', 'dsdsa', 'dss@dsds.com', 'Zakataka', '333333333333'),
(9, 'eeeeeeee', 'dddddd', 'f@ffe.com', 'dddddddddddd', '33333333333333'),
(10, 'benslama', 'fares', 'faresbenslama95@gmail.com', '123456', '12345671'),
(11, 'dssds', 'fedds', 'faresbenslama95@gmail.coms', '\"\"\"\"\"\"\"\"\"\"\"\"\"', '44444444444'),
(12, 'sadsad', 'dsad', 'faresbenslama95@gmail.comse', 'Zakataka', '555555555555'),
(13, 'sdsds', 'ffsd', 'faresbenslama95@gmail.comh', 'ddddddddddd', '555555555555'),
(14, 'sdsd', 'dsd', 'faresbenslama95@gmaile.com', 'Zakataka', '33333333333'),
(15, 'eeee', 'ddddd', 'gfgf@dssdsd.com', '123456', '123456'),
(16, 'benslama', 'fares', 'fares@bs.fbs', 'Zakataka', '73345643'),
(22, 'j', 'i', 'faresbenslama95@gmailvv.com', 'j', '12345678'),
(23, 'Joo', 'Jamil', 'jamil@gmail.com', '123456', '12345678');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bike`
--
ALTER TABLE `bike`
  ADD CONSTRAINT `bike_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`);

--
-- Constraints for table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`bike_id`) REFERENCES `bike` (`bike_id`),
  ADD CONSTRAINT `location_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
