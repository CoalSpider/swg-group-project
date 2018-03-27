drop database if exists CMSDatabase;

create database CMSDatabase;

use CMSDatabase;



create table tag
(
	tagId int primary key auto_increment,
    name varchar(128)
);



create table role
(
	roleId int primary key auto_increment,
    Name varchar(128) not null
);

create table `user`
(
    userId int primary key auto_increment,
    name varchar(128) not null,
    password varchar(512) not null,
    roleId int not null,
    userType tinyint not null,
    foreign key (roleId) references role(roleId)
);

create table Post
(
	postId int primary key auto_increment,
    userId int not null,
    `date` Date not null,
    title varchar(128) not null,
    summary tinyText not null,
    content longtext not null,
    foreign key (userid) references user(userId)
);

create table postTag
(
	postId int,
    tagId int,
    
    primary key(postId, tagId),
    foreign key (postId) references post(postId),
    foreign key (tagId) references tag(tagId)
);

create table category
(
	categoryId int primary key auto_increment,
    name varchar(128)
);
	
create table postCategory
(
    categoryId int not null,
    postId int not null,
    
    primary Key(categoryId,postId),
	foreign key (categoryId) references category(categoryId),
	foreign key (postId) references post(postId)
     
);


    
	
