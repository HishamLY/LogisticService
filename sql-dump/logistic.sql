-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 24, 2018 at 11:58 PM
-- Server version: 5.7.24-0ubuntu0.18.04.1
-- PHP Version: 7.2.10-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `logistic`
--

-- --------------------------------------------------------

--
-- Table structure for table `courier`
--

CREATE TABLE `courier` (
  `id` varchar(36) NOT NULL,
  `name` varchar(30) NOT NULL,
  `courierType` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courier`
--

INSERT INTO `courier` (`id`, `name`, `courierType`) VALUES
('1', 'Radiyya', 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` varchar(36) NOT NULL,
  `name` varchar(30) NOT NULL,
  `customerType` int(11) NOT NULL DEFAULT '0',
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `customerType`, `address`) VALUES
('1', 'Logistik', 0, 'Jalan Ganesha No. 11');

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `id` varchar(36) NOT NULL,
  `amount` int(11) NOT NULL,
  `requestId` varchar(36) NOT NULL,
  `customerId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`id`, `amount`, `requestId`, `customerId`) VALUES
('1c92dfdb-31d9-4149-b834-1d43a0ef2fc0', 20000, '2d864dea-91cc-4319-b84b-6ecb30d5a8f7', '1'),
('976c6fd2-b7c7-4b92-a94a-61373be80fcd', 1200000, '7f4fda89-de13-4678-be73-a0365379dcc5', '1');

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `id` varchar(36) NOT NULL,
  `status` int(11) NOT NULL,
  `fee` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `customerId` varchar(36) NOT NULL,
  `insuranceType` int(11) NOT NULL DEFAULT '0',
  `type` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`id`, `status`, `fee`, `quantity`, `customerId`, `insuranceType`, `type`) VALUES
('2d864dea-91cc-4319-b84b-6ecb30d5a8f7', 0, 20000, 1, '1', 0, 0),
('3e833653-0e51-4390-a139-7f26276e5dc5', 0, 1200000, 600, '1', 1, 0),
('7f4fda89-de13-4678-be73-a0365379dcc5', 0, 1200000, 600, '1', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `shipping_request`
--

CREATE TABLE `shipping_request` (
  `id` varchar(36) NOT NULL,
  `location` text NOT NULL,
  `weight` float NOT NULL,
  `destinationAddress` text NOT NULL,
  `courierId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shipping_request`
--

INSERT INTO `shipping_request` (`id`, `location`, `weight`, `destinationAddress`, `courierId`) VALUES
('2d864dea-91cc-4319-b84b-6ecb30d5a8f7', 'Bandung', 1, 'Jalan Bekasi no 5', '1');

-- --------------------------------------------------------

--
-- Table structure for table `warehouse`
--

CREATE TABLE `warehouse` (
  `id` varchar(36) NOT NULL,
  `address` text NOT NULL,
  `capacity` int(11) NOT NULL,
  `availability` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `warehouse`
--

INSERT INTO `warehouse` (`id`, `address`, `capacity`, `availability`) VALUES
('1', 'Jalan Ganesha No. 10', 1000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `warehousing_request`
--

CREATE TABLE `warehousing_request` (
  `id` varchar(36) NOT NULL,
  `warehouseId` varchar(36) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `warehousing_request`
--

INSERT INTO `warehousing_request` (`id`, `warehouseId`, `startDate`, `endDate`) VALUES
('7f4fda89-de13-4678-be73-a0365379dcc5', '1', '2018-09-11', '2018-11-11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courier`
--
ALTER TABLE `courier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Invoice_customer` (`customerId`),
  ADD KEY `request_id` (`requestId`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customerId`);

--
-- Indexes for table `shipping_request`
--
ALTER TABLE `shipping_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courier_id` (`courierId`);

--
-- Indexes for table `warehouse`
--
ALTER TABLE `warehouse`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `warehousing_request`
--
ALTER TABLE `warehousing_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `warehousing_request_ibfk_2` (`warehouseId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `Invoice_customer` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`requestId`) REFERENCES `request` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `shipping_request`
--
ALTER TABLE `shipping_request`
  ADD CONSTRAINT `shipping_request_ibfk_1` FOREIGN KEY (`id`) REFERENCES `request` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shipping_request_ibfk_2` FOREIGN KEY (`courierId`) REFERENCES `courier` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `warehousing_request`
--
ALTER TABLE `warehousing_request`
  ADD CONSTRAINT `warehousing_request_ibfk_2` FOREIGN KEY (`warehouseId`) REFERENCES `warehouse` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `warehousing_request_ibfk_3` FOREIGN KEY (`id`) REFERENCES `request` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
