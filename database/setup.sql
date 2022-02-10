create database [db];
create user '[username]'@'localhost' identified by '[password]';
grant select,insert,update,delete on [db].* to '[username]'@'localhost'; # Only granting the required privileges to database user
flush privileges;
use [db];

create table users
(
  `user_id` int not null auto_increment,
  `first_name` varchar(50) not null default '',
  `last_name` varchar(50) not null default '',
  `username` varchar(50) not null default '',
  `phone` varchar(50) not null,
  `date_created` datetime not null default current_timestamp,
  `last_logged_in` datetime not null default current_timestamp,
  `password` varchar(50) not null default '',
   primary key (user_id)
) engine = InnoDB;

create table contacts 
(
  `contact_id` int not null auto_increment,
  `user_id` int not null,
  `first_name` varchar(50) not null default '',
  `last_name` varchar(50) not null default '',
  `phone` varchar(50) not null,
  `email` varchar(50) not null default '', 
  `date_created` datetime not null default current_timestamp,
   primary key (contact_id),
   foreign key (user_id) references users(user_id)
) engine = InnoDB;

