-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2024 at 07:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbcom`
--

-- --------------------------------------------------------

--
-- Table structure for table `accountsreceivable`
--

CREATE TABLE `accountsreceivable` (
  `TransactionID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `TransactionType` enum('Credit','Debit') NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `TransactionDate` datetime NOT NULL,
  `Description` varchar(255) NOT NULL,
  `DueDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accountsreceivable`
--

INSERT INTO `accountsreceivable` (`TransactionID`, `CustomerID`, `TransactionType`, `Amount`, `TransactionDate`, `Description`, `DueDate`) VALUES
(9, 1, 'Credit', 800.00, '2024-10-15 22:28:20', 'Owe', NULL),
(10, 1, 'Credit', 800.00, '2024-10-15 22:28:28', 'Owe', NULL),
(11, 2, 'Credit', 800.00, '2024-10-15 22:34:50', 'Owe', NULL),
(12, 2, 'Credit', 800.00, '2024-10-15 22:36:03', 'Owe', NULL),
(13, 1, 'Credit', 1100.00, '2024-10-15 22:41:05', 'Owe', NULL),
(24, 2, 'Credit', 2000.00, '2024-10-16 21:39:26', 'Owe', NULL),
(25, 2, 'Debit', 2599.00, '2024-10-16 22:03:11', 'Paid', NULL),
(26, 1, 'Credit', 1000.00, '2024-10-17 21:14:31', 'Owe', NULL),
(27, 1, 'Credit', 1500.00, '2024-10-17 21:14:38', 'Owe', NULL),
(28, 1, 'Credit', 1500.00, '2024-10-17 21:26:40', 'Owe', NULL),
(29, 1, 'Credit', 1000.00, '2024-10-17 21:27:15', 'Owe', NULL),
(30, 1, 'Credit', 2599.00, '2024-10-17 21:27:35', 'Owe', NULL),
(31, 1, 'Credit', 1500.00, '2024-10-17 21:35:06', 'Owe', NULL),
(32, 1, 'Credit', 1500.00, '2024-10-17 21:39:12', 'Owe', NULL),
(33, 2, 'Credit', 16840.00, '2024-10-17 21:47:50', 'Owe', '2024-11-16'),
(34, 2, 'Credit', 1798.00, '2024-10-17 21:51:27', 'Owe', '2024-11-16'),
(35, 2, 'Credit', 19795.00, '2024-10-17 22:28:22', 'Owe', '2024-11-16');

-- --------------------------------------------------------

--
-- Table structure for table `accountsreceivablehistory`
--

CREATE TABLE `accountsreceivablehistory` (
  `TransactionID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `TransactionType` enum('Credit','Debit') NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `TransactionDate` datetime NOT NULL,
  `Description` varchar(255) NOT NULL,
  `DueDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accountsreceivablehistory`
--

INSERT INTO `accountsreceivablehistory` (`TransactionID`, `CustomerID`, `ProductID`, `TransactionType`, `Amount`, `TransactionDate`, `Description`, `DueDate`) VALUES
(23, 2, 6, 'Debit', 2599.00, '2024-10-16 22:03:11', 'Paid', NULL),
(24, 1, 2, 'Credit', 1500.00, '2024-10-17 21:26:40', 'Owe', NULL),
(25, 1, 3, 'Credit', 1000.00, '2024-10-17 21:27:15', 'Owe', NULL),
(26, 1, 6, 'Credit', 2599.00, '2024-10-17 21:27:35', 'Owe', NULL),
(28, 1, 15, 'Credit', 1500.00, '2024-10-17 21:39:12', 'Owe', NULL),
(29, 2, 10, 'Credit', 16840.00, '2024-10-17 21:47:50', 'Owe', '2024-11-16'),
(30, 2, 7, 'Credit', 1798.00, '2024-10-17 21:51:27', 'Owe', '2024-11-16'),
(31, 2, 8, 'Credit', 19795.00, '2024-10-17 22:28:22', 'Owe', '2024-11-16');

-- --------------------------------------------------------

--
-- Table structure for table `balance`
--

CREATE TABLE `balance` (
  `CustomerID` int(11) NOT NULL,
  `CurrentBalance` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `balance`
--

INSERT INTO `balance` (`CustomerID`, `CurrentBalance`) VALUES
(1, 15705.00),
(2, 9501.00);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `CustomerID` int(11) NOT NULL,
  `CustomerName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `ContactDetails` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`CustomerID`, `CustomerName`, `Email`, `ContactDetails`) VALUES
(1, 'lucy anne', 'lucy@gmail.com', '0952421568'),
(2, 'Annie Mall', 'annie@gmail.com', '09554798897');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `ProductID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `ProductName` varchar(255) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `Price` decimal(10,2) DEFAULT NULL,
  `Stock` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`ProductID`, `Quantity`, `ProductName`, `CreatedAt`, `Price`, `Stock`) VALUES
(1, 4, '', '2024-10-14 01:21:54', NULL, 0),
(2, 3, '', '2024-10-14 01:38:06', NULL, 0),
(3, 3, '', '2024-10-14 01:36:16', NULL, 0),
(6, 2, '', '2024-10-14 17:29:43', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `InvoiceID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `TotalAmount` decimal(10,2) NOT NULL,
  `InvoiceDate` datetime NOT NULL,
  `PaymentStatus` enum('Paid','Unpaid') NOT NULL DEFAULT 'Unpaid'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `paymentreminders`
--

CREATE TABLE `paymentreminders` (
  `ReminderID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `InvoiceID` int(11) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `CustomerName` varchar(255) NOT NULL,
  `TotalAmount` decimal(10,2) NOT NULL,
  `ReminderDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ProductID` int(11) NOT NULL,
  `ProductName` varchar(255) NOT NULL,
  `Price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `ProductName`, `Price`) VALUES
(1, 'Gaming Laptop', 50499.00),
(2, 'Mechanical Keyboard', 1500.00),
(3, 'Gaming Mouse', 1000.00),
(4, '27-inch Monitor', 9290.00),
(5, 'External Hard Drive 1TB', 2900.00),
(6, 'Wireless Headset', 2599.00),
(7, 'USB-C Docking Station', 899.00),
(8, 'Graphics Card NVIDIA RTX 3060', 19795.00),
(9, '32GB RAM DDR4', 15094.00),
(10, 'Intel i7 Processor', 16840.00),
(11, 'Gaming Chair', 27990.00),
(12, 'Webcam 1080p', 2500.00),
(13, 'Microphone USB', 1500.00),
(14, 'Office Desk', 5000.00),
(15, 'Laptop Backpack', 1500.00);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `TransactionID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `TransactionType` enum('Credit','Debit') NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `TransactionDate` datetime NOT NULL DEFAULT current_timestamp(),
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`TransactionID`, `CustomerID`, `ProductID`, `TransactionType`, `Amount`, `TransactionDate`, `Description`) VALUES
(1, 2, 6, 'Debit', 2599.00, '2024-10-16 22:03:11', 'Paid'),
(2, 2, 3, 'Credit', 1000.00, '2024-10-17 21:01:45', 'Owe');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'admin@gmail.com', 'password123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accountsreceivable`
--
ALTER TABLE `accountsreceivable`
  ADD PRIMARY KEY (`TransactionID`);

--
-- Indexes for table `accountsreceivablehistory`
--
ALTER TABLE `accountsreceivablehistory`
  ADD PRIMARY KEY (`TransactionID`),
  ADD KEY `CustomerID` (`CustomerID`),
  ADD KEY `accountsreceivablehistory_ibfk_2` (`ProductID`);

--
-- Indexes for table `balance`
--
ALTER TABLE `balance`
  ADD PRIMARY KEY (`CustomerID`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`CustomerID`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`ProductID`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`InvoiceID`),
  ADD KEY `CustomerID` (`CustomerID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `paymentreminders`
--
ALTER TABLE `paymentreminders`
  ADD PRIMARY KEY (`ReminderID`),
  ADD KEY `CustomerID` (`CustomerID`),
  ADD KEY `InvoiceID` (`InvoiceID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`TransactionID`),
  ADD KEY `CustomerID` (`CustomerID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accountsreceivable`
--
ALTER TABLE `accountsreceivable`
  MODIFY `TransactionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `accountsreceivablehistory`
--
ALTER TABLE `accountsreceivablehistory`
  MODIFY `TransactionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `balance`
--
ALTER TABLE `balance`
  MODIFY `CustomerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `CustomerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `InvoiceID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `paymentreminders`
--
ALTER TABLE `paymentreminders`
  MODIFY `ReminderID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `TransactionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accountsreceivablehistory`
--
ALTER TABLE `accountsreceivablehistory`
  ADD CONSTRAINT `accountsreceivablehistory_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`),
  ADD CONSTRAINT `accountsreceivablehistory_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`);

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`),
  ADD CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`);

--
-- Constraints for table `paymentreminders`
--
ALTER TABLE `paymentreminders`
  ADD CONSTRAINT `paymentreminders_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`),
  ADD CONSTRAINT `paymentreminders_ibfk_2` FOREIGN KEY (`InvoiceID`) REFERENCES `invoices` (`InvoiceID`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
