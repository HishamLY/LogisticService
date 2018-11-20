-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 16, 2018 at 11:51 PM
-- Server version: 5.7.24-0ubuntu0.18.04.1
-- PHP Version: 7.2.10-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Logistic`
--

-- --------------------------------------------------------

--
-- Table structure for table `Courier`
--

CREATE TABLE `Courier` (
  `id` varchar(36) NOT NULL,
  `name` varchar(30) NOT NULL,
  `courier_type` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Customer`
--

CREATE TABLE `Customer` (
  `id` varchar(36) NOT NULL,
  `name` varchar(30) NOT NULL,
  `customer_type` int(11) NOT NULL DEFAULT '0',
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Invoice`
--

CREATE TABLE `Invoice` (
  `id` varchar(36) NOT NULL,
  `amount` int(11) NOT NULL,
  `request_id` varchar(36) NOT NULL,
  `customer_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Request`
--

CREATE TABLE `Request` (
  `id` varchar(36) NOT NULL,
  `status` int(11) NOT NULL,
  `fee` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `customer_id` varchar(36) NOT NULL,
  `insurance_type` int(11) NOT NULL DEFAULT '0',
  `type` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Shipping_Request`
--

CREATE TABLE `Shipping_Request` (
  `id` varchar(36) NOT NULL,
  `location` text NOT NULL,
  `weight` float NOT NULL,
  `destination_address` text NOT NULL,
  `courier_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Warehouse`
--

CREATE TABLE `Warehouse` (
  `id` varchar(36) NOT NULL,
  `address` text NOT NULL,
  `capacity` int(11) NOT NULL,
  `availability` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Warehousing_Request`
--

CREATE TABLE `Warehousing_Request` (
  `id` varchar(36) NOT NULL,
  `warehouse_id` varchar(36) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Courier`
--
ALTER TABLE `Courier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Customer`
--
ALTER TABLE `Customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Invoice`
--
ALTER TABLE `Invoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Invoice_customer` (`customer_id`),
  ADD KEY `request_id` (`request_id`);

--
-- Indexes for table `Request`
--
ALTER TABLE `Request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Shipping_Request`
--
ALTER TABLE `Shipping_Request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courier_id` (`courier_id`);

--
-- Indexes for table `Warehouse`
--
ALTER TABLE `Warehouse`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Warehousing_Request`
--
ALTER TABLE `Warehousing_Request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `warehouse_id` (`warehouse_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Invoice`
--
ALTER TABLE `Invoice`
  ADD CONSTRAINT `Invoice_customer` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Invoice_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `Request` (`id`);

--
-- Constraints for table `Shipping_Request`
--
ALTER TABLE `Shipping_Request`
  ADD CONSTRAINT `Shipping_Request_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Request` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `Shipping_Request_ibfk_2` FOREIGN KEY (`courier_id`) REFERENCES `Courier` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Warehousing_Request`
--
ALTER TABLE `Warehousing_Request`
  ADD CONSTRAINT `Warehousing_Request_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Request` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Warehousing_Request_ibfk_2` FOREIGN KEY (`warehouse_id`) REFERENCES `Warehouse` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
