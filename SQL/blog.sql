drop database if exists CMSDatabase;

create database CMSDatabase;

use CMSDatabase;

create table tag
(
	tagId int primary key auto_increment,
    name varchar(128)
);



create table Role
(
	roleId int primary key auto_increment,
    Name varchar(128) not null
);

create table `User`
(
    userId int primary key auto_increment,
    `name` varchar(128) not null,
    `password` varchar(512) not null
);

create table UserRole
(
	userId int,
    roleId int,
    primary key(userId, roleId),
    foreign key(userId) references `User`(userId),
    foreign key(roleId) references Role(roleId)
);

create table Post
(
	postId int primary key auto_increment,
    userId int not null,
    `date` Date not null,
    title varchar(128) not null,
    summary tinyText not null,
    content longtext not null,
    foreign key (userid) references `User`(userId)
);

create table PostTag
(
	postId int,
    tagId int,
    primary key(postId, tagId),
    foreign key (postId) references Post(postId),
    foreign key (tagId) references Tag(tagId)
);

create table Category
(
	categoryId int primary key auto_increment,
    name varchar(128)
);
	
create table PostCategory
(
    categoryId int,
    postId int,
    primary Key(categoryId,postId),
	foreign key (categoryId) references Category(categoryId),
	foreign key (postId) references Post(postId)
     
);


    
	
