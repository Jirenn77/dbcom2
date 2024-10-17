-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 31, 2024 at 09:22 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `animal_clinic_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_breeds`
--

CREATE TABLE `tbl_breeds` (
  `breed_id` int(11) NOT NULL,
  `breed_name` varchar(100) DEFAULT NULL,
  `species_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_breeds`
--

INSERT INTO `tbl_breeds` (`breed_id`, `breed_name`, `species_id`) VALUES
(1, 'Mountain', 1),
(2, 'Sigbin Blue', NULL),
(3, 'Sigbin Pink', NULL),
(4, 'Sigbin Blue', 1),
(5, 'Sigbin Blue1', 2),
(6, 'Sigbin Pink1', 2),
(7, 'qwerty', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_owners`
--

CREATE TABLE `tbl_owners` (
  `owner_id` int(11) NOT NULL,
  `owner_name` varchar(100) DEFAULT NULL,
  `owner_contact_details` varchar(100) DEFAULT NULL,
  `owner_address` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_owners`
--

INSERT INTO `tbl_owners` (`owner_id`, `owner_name`, `owner_contact_details`, `owner_address`) VALUES
(1, 'Jecham Rey Cabusog', '12345678', 'CDO'),
(2, 'Jecham Rey Cabusog', '123456', 'CDO'),
(3, 'SABEL', '521512SA', 'ASFAF');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pets`
--

CREATE TABLE `tbl_pets` (
  `pet_id` int(11) NOT NULL,
  `pet_name` varchar(100) DEFAULT NULL,
  `species_id` int(11) DEFAULT NULL,
  `breed_id` int(11) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_pets`
--

INSERT INTO `tbl_pets` (`pet_id`, `pet_name`, `species_id`, `breed_id`, `date_of_birth`, `owner_id`) VALUES
(1, 'Macuse', 1, 1, '2024-05-11', 1),
(2, 'Choco', 1, 1, '2024-05-11', 1),
(3, 'gabons', 2, 2, '1912-12-12', 3),
(4, 'gabons1', 2, 5, '1612-12-12', 3),
(5, 'gabons2', 2, 6, '1621-01-04', 3);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_species`
--

CREATE TABLE `tbl_species` (
  `species_id` int(11) NOT NULL,
  `species_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_species`
--

INSERT INTO `tbl_species` (`species_id`, `species_name`) VALUES
(1, 'Blue Whale'),
(2, 'Sigbin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_breeds`
--
ALTER TABLE `tbl_breeds`
  ADD PRIMARY KEY (`breed_id`),
  ADD KEY `species_id` (`species_id`);

--
-- Indexes for table `tbl_owners`
--
ALTER TABLE `tbl_owners`
  ADD PRIMARY KEY (`owner_id`);

--
-- Indexes for table `tbl_pets`
--
ALTER TABLE `tbl_pets`
  ADD PRIMARY KEY (`pet_id`),
  ADD KEY `owner_id` (`owner_id`),
  ADD KEY `species_id` (`species_id`),
  ADD KEY `breed_id` (`breed_id`);

--
-- Indexes for table `tbl_species`
--
ALTER TABLE `tbl_species`
  ADD PRIMARY KEY (`species_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_breeds`
--
ALTER TABLE `tbl_breeds`
  MODIFY `breed_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_owners`
--
ALTER TABLE `tbl_owners`
  MODIFY `owner_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_pets`
--
ALTER TABLE `tbl_pets`
  MODIFY `pet_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_species`
--
ALTER TABLE `tbl_species`
  MODIFY `species_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_breeds`
--
ALTER TABLE `tbl_breeds`
  ADD CONSTRAINT `tbl_breeds_ibfk_1` FOREIGN KEY (`species_id`) REFERENCES `tbl_species` (`species_id`);

--
-- Constraints for table `tbl_pets`
--
ALTER TABLE `tbl_pets`
  ADD CONSTRAINT `tbl_pets_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `tbl_owners` (`owner_id`),
  ADD CONSTRAINT `tbl_pets_ibfk_2` FOREIGN KEY (`species_id`) REFERENCES `tbl_species` (`species_id`),
  ADD CONSTRAINT `tbl_pets_ibfk_3` FOREIGN KEY (`breed_id`) REFERENCES `tbl_breeds` (`breed_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
