DROP DATABASE IF EXISTS `project_6`;
CREATE DATABASE `project_6`; 
USE `project_6`;

SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

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

CREATE TABLE `user_passwords` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` integer,
  `password` varchar(255),
  `valid` BOOLEAN DEFAULT TRUE
);

ALTER TABLE `todos` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `user_passwords` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`postId`) REFERENCES `posts` (`id`);


INSERT INTO users (username, email, company_name, city ) VALUES ('username1', 'my_mail1', 'my_company1', 'my_city1');
INSERT INTO users (username, email, company_name, city ) VALUES ('username2', 'my_mail2', 'my_company2', 'my_city2');
INSERT INTO users (username, email, company_name, city ) VALUES ('username3', 'my_mail3', 'my_company3', 'my_city3');
INSERT INTO users (username, email, company_name, city ) VALUES ('username4', 'my_mail4', 'my_company4', 'my_city4');
INSERT INTO users (username, email, company_name, city ) VALUES ('username5', 'my_mail5', 'my_company5', 'my_city5');

INSERT INTO todos (userId, title ) VALUES (1, 'title1');
INSERT INTO todos (userId, title ) VALUES (1, 'title2');
INSERT INTO todos (userId, title ) VALUES (3, 'title3');
INSERT INTO todos (userId, title ) VALUES (4, 'title4');
INSERT INTO todos (userId, title ) VALUES (5, 'title5');

INSERT INTO posts (userId, title, body ) VALUES (1, 'title1', 'body1');
INSERT INTO posts (userId, title, body ) VALUES (2, 'title2', 'body2');
INSERT INTO posts (userId, title, body ) VALUES (3, 'title3', 'body3');
INSERT INTO posts (userId, title, body ) VALUES (4, 'title4', 'body4');
INSERT INTO posts (userId, title, body ) VALUES (5, 'title5', 'body5');

INSERT INTO comments (postId, name, email, body ) VALUES (1, 'name1', 'email1', 'body1');
INSERT INTO comments (postId, name, email, body ) VALUES (2, 'name2', 'email2', 'body2');
INSERT INTO comments (postId, name, email, body ) VALUES (3, 'name3', 'email3', 'body3');
INSERT INTO comments (postId, name, email, body ) VALUES (4, 'name4', 'email4', 'body4');
INSERT INTO comments (postId, name, email, body ) VALUES (5, 'name5', 'email5', 'body5');

INSERT INTO user_passwords (userId, password ) VALUES (1, 'password1');
INSERT INTO user_passwords (userId, password ) VALUES (2, 'password2');
INSERT INTO user_passwords (userId, password ) VALUES (3, 'password3');
INSERT INTO user_passwords (userId, password ) VALUES (4, 'password4');
INSERT INTO user_passwords (userId, password ) VALUES (5, 'password5');

```
