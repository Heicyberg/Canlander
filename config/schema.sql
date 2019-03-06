DRop database if exists calender_users;
create database calender_users;
use calender_users;


CREATE TABLE users ( user_id varcharacter(36) NOT NULL,  user_name varchar(255) NOT NULL,  password varchar(8) NOT NULL, createdAt datetime default CURRENT_TIMESTAMP NOT null, updatedAt datetime default CURRENT_TIMESTAMP, PRIMARY KEY (user_id) );


insert into users (user_name, password, user_id) values ('Mike23','admin123',uuid());
insert into users (user_name, password, user_id) values ('Leecode','admin456',uuid());


