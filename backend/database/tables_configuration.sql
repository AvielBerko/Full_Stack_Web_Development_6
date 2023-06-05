CREATE TABLE `users` (
  `id` integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(255),
  `email` varchar(255),
  `company_name` varchar(255),
  `city` varchar(255),
  `valid` BOOLEAN
);

CREATE TABLE `todos` (
  `id` integer PRIMARY KEY,
  `userId` integer,
  `title` varchar(255),
  `completed` BOOLEAN,
  `valid` BOOLEAN
);

CREATE TABLE `posts` (
  `id` integer PRIMARY KEY,
  `userId` integer,
  `title` varchar(255),
  `body` varchar(255),
  `valid` BOOLEAN
);

CREATE TABLE `comments` (
  `id` integer PRIMARY KEY,
  `postId` varchar(255),
  `name` varchar(255),
  `email` varchar(255),
  `body` varchar(255),
  `valid` BOOLEAN
);

CREATE TABLE `user_password` (
  `id` integer PRIMARY KEY,
  `userId` integer,
  `username` varchar(255),
  `password` varchar(255),
  `valid` BOOLEAN
);

ALTER TABLE `todos` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `user_password` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);
