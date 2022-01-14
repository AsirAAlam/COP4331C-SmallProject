create database lamp;
create user lampy identified by 'password123';
grant all privileges on lamp.* to 'lampy'@'localhost' identified by 'password123' with grant option;
flush privileges;
use database lamp;

create table users
(
  `id` int not null auto_increment,
  `first_name` varchar(50) not null default '',
  `last_name` varchar(50) not null default '',
  `username` varchar(50) not null default '',
  `date_created` datetime not null default current_timestamp,
  `last_logged_in` datetime not null default current_timestamp,
  `password` varchar(50) not null default '[insert something]', /* Not sure if this is the right way to implement this */
  primary key ('id')
) engine = InnoDB;

