-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 27, 2026 at 07:21 AM
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
-- Database: `galeri`
--

-- --------------------------------------------------------

--
-- Table structure for table `foto`
--

CREATE TABLE `foto` (
  `id_foto` int(11) NOT NULL,
  `judul` varchar(100) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `tgl_unggah` datetime DEFAULT NULL,
  `nama_file` varchar(100) DEFAULT NULL,
  `id_pengguna` int(11) DEFAULT NULL,
  `id_kategori` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `foto`
--

INSERT INTO `foto` (`id_foto`, `judul`, `deskripsi`, `tgl_unggah`, `nama_file`, `id_pengguna`, `id_kategori`) VALUES
(1, 'Sunset di Pantai', 'Pemandangan matahari terbenam yang indah', '2025-07-16 00:00:00', 'sunset.jpg', 1, 1),
(2, 'Gunung Merapi', 'Foto pegunungan saat pagi hari', '2025-07-16 00:00:00', 'merapi.jpg', 2, 1),
(3, 'Selfie Andi', 'Selfie di depan candi', '2025-07-15 00:00:00', 'selfie.jpg', 1, 2),
(12, 'design vektor', 'wkwkwkwk', '2026-10-22 00:00:00', '1792675056085-419730524-One_Love_for_Software-removebg-preview.png', 8, 9),
(17, 'design hools', 'wkwkwk', '2026-10-23 10:33:03', '1792726383813-330643469-download (9).jpg', 8, 11),
(18, 'design suka suka', 'ahahahaha', '2026-10-23 10:31:55', '1792726315864-617488154-ERD Sistem Perpustakaan Sekolah.png', 8, 11);

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`) VALUES
(1, 'Pemandangan'),
(2, 'Potret'),
(3, 'Perjalanan'),
(4, 'Makanan'),
(5, 'Hitam Putih'),
(8, 'gambar lucu bgt'),
(9, 'vektor'),
(11, 'design');

-- --------------------------------------------------------

--
-- Table structure for table `pengguna`
--

CREATE TABLE `pengguna` (
  `id_pengguna` int(11) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `no_hp` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengguna`
--

INSERT INTO `pengguna` (`id_pengguna`, `nama`, `email`, `password`, `no_hp`) VALUES
(1, 'Andi', 'andi@mail.com', 'password123', '081234567890'),
(2, 'Budi', 'budi@mail.com', 'passbudi', '081111111111'),
(3, 'Citra', 'citra@mail.com', 'passcitra', '84444444444'),
(8, 'Udin', 'udin@gmail.com', '$2b$10$AgVaprSAZK3f3hw9jwwnS.VXxRtYJfyRXW/bkQYWuGuLWK9j/jSlS', '08123456789'),
(10, 'bahrudin', 'bahrudin123@gmail.com', '$2b$10$GeDFmquunloAna.JpZHvuOakVA/FCOxE2ePW1goyhH.5rNHzw/92W', '08123902789'),
(14, 'bahrudin', 'bahrudi123@gmail.com', '$2b$10$uK6I9HgJmFaoD1UomC4LweTFGisad4yvbWCzhhuXu/8tKhmufI5iu', '08123900789');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `foto`
--
ALTER TABLE `foto`
  ADD PRIMARY KEY (`id_foto`),
  ADD KEY `id_pengguna` (`id_pengguna`),
  ADD KEY `id_kategori` (`id_kategori`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id_pengguna`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `foto`
--
ALTER TABLE `foto`
  MODIFY `id_foto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id_pengguna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `foto`
--
ALTER TABLE `foto`
  ADD CONSTRAINT `foto_ibfk_1` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna` (`id_pengguna`) ON DELETE CASCADE,
  ADD CONSTRAINT `foto_ibfk_2` FOREIGN KEY (`id_kategori`) REFERENCES `kategori` (`id_kategori`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
