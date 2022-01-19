create database lamp;
create user lampy identified by 'P@ssw0rd';
grant all privileges on lamp.* to 'lampy'@'localhost' identified by 'P@ssw0rd' with grant option;
flush privileges;
use database lamp;

create table users
(
  `user_id` int not null auto_increment,
  `first_name` varchar(50) not null default '',
  `last_name` varchar(50) not null default '',
  `username` varchar(50) not null default '',
  `phone` int not null default '',
  `date_created` datetime not null default current_timestamp,
  `last_logged_in` datetime not null default current_timestamp,
  `password` varchar(50) not null default '',
   primary key ('user_id')
) engine = InnoDB;

create table contacts 
(
  `contact_id` int not null auto_increment,
  `user_id` int not null,
  `first_name` varchar(50) not null default '',
  `last_name` varchar(50) not null default '',
  `phone` int not null default '',
   primary key ('contact_id'),
   foreign key ('user_id') references users('user_id')
) engine = InnoDB;

