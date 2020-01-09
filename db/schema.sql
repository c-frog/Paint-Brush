DROP DATABASE IF EXISTS images_db;

CREATE DATABASE images_db;

use images_db;

CREATE TABLE Images (
id INT AUTO_INCREMENT not null,
name varchar(300) not null,
coordinates TEXT,
createdAt TIMESTAMP,
updatedAt TIMESTAMP,
color varchar(100),
primary key (id)
);