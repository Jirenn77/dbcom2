-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2024 at 08:38 AM
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
-- Database: `pets_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `breeds`
--

CREATE TABLE `breeds` (
  `BreedID` int(11) NOT NULL,
  `BreedName` varchar(100) DEFAULT NULL,
  `SpeciesID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `breeds`
--

INSERT INTO `breeds` (`BreedID`, `BreedName`, `SpeciesID`) VALUES
(1, 'Labrador Retriever', 1),
(2, 'German Shepherd', 1),
(3, 'Golden Retriever', 1),
(4, 'Bulldog', 1),
(5, 'Beagle', 1),
(6, 'Persian', 2),
(7, 'Maine Coon', 2),
(8, 'Siamese', 2),
(9, 'Sphynx', 2),
(10, 'Bengal', 2);

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE `owners` (
  `OwnerID` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `ContactDetails` varchar(100) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`OwnerID`, `Name`, `ContactDetails`, `Address`) VALUES
(3, 'Jane Smith', '555-5678', '456 Oak Avenue'),
(4, 'dan', '221451512', 'among add'),
(5, 'davidmaoy', '2412414221', 'ambot asa'),
(6, 'davidmaoy', '2412414221', 'ambot asa'),
(7, 'davidmaoy', '2412414221', 'ambot asa'),
(8, 'davidmaoy', '2412414221', 'ambot asa');

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `PetID` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `SpeciesID` int(11) DEFAULT NULL,
  `BreedID` int(11) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `OwnerID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pets`
--

INSERT INTO `pets` (`PetID`, `Name`, `SpeciesID`, `BreedID`, `DateOfBirth`, `OwnerID`) VALUES
(1, 'gabons', 1, 4, '2024-12-23', 4),
(2, 'dabs', 1, 4, '1912-12-12', 5);

-- --------------------------------------------------------

--
-- Table structure for table `species`
--

CREATE TABLE `species` (
  `SpeciesID` int(11) NOT NULL,
  `SpeciesName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `species`
--

INSERT INTO `species` (`SpeciesID`, `SpeciesName`) VALUES
(1, 'Dog'),
(2, 'Cat');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `breeds`
--
ALTER TABLE `breeds`
  ADD PRIMARY KEY (`BreedID`),
  ADD KEY `SpeciesID` (`SpeciesID`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`OwnerID`);

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`PetID`),
  ADD KEY `SpeciesID` (`SpeciesID`),
  ADD KEY `pets_ibfk_1` (`OwnerID`),
  ADD KEY `pets_ibfk_3` (`BreedID`);

--
-- Indexes for table `species`
--
ALTER TABLE `species`
  ADD PRIMARY KEY (`SpeciesID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `breeds`
--
ALTER TABLE `breeds`
  MODIFY `BreedID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
  MODIFY `OwnerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pets`
--
ALTER TABLE `pets`
  MODIFY `PetID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `species`
--
ALTER TABLE `species`
  MODIFY `SpeciesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `breeds`
--
ALTER TABLE `breeds`
  ADD CONSTRAINT `breeds_ibfk_1` FOREIGN KEY (`SpeciesID`) REFERENCES `species` (`SpeciesID`);

--
-- Constraints for table `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`OwnerID`) REFERENCES `owners` (`OwnerID`),
  ADD CONSTRAINT `pets_ibfk_3` FOREIGN KEY (`BreedID`) REFERENCES `breeds` (`BreedID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
