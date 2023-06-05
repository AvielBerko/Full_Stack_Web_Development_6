CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(255),
  `email` varchar(255),
  `company_name` varchar(255),
  `city` varchar(255),
  `valid` BOOLEAN DEFAULT TRUE,
  UNIQUE (`username`)
);

CREATE TABLE `todos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` integer,
  `title` varchar(255),
  `completed` BOOLEAN DEFAULT FALSE,
  `valid` BOOLEAN DEFAULT TRUE
);

CREATE TABLE `posts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` integer,
  `title` varchar(255),
  `body` varchar(255),
  `valid` BOOLEAN DEFAULT TRUE
);

CREATE TABLE `comments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `postId` integer,
  `name` varchar(255),
  `email` varchar(255),
  `body` varchar(255),
  `valid` BOOLEAN DEFAULT TRUE
);

CREATE TABLE `user_password` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` integer,
  `password` varchar(255),
  `valid` BOOLEAN DEFAULT TRUE
);

ALTER TABLE `todos` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `user_password` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);
