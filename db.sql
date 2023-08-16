CREATE TABLE IF NOT EXISTS users
(
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	username varchar(50) NOT NULL UNIQUE,
	password varchar(255) NOT NULL,
	role int(1) NOT NULL DEFAULT 0,
	last_online timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	register_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS permissions
(
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name varchar(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user_permission
(
	user_id int(4) NOT NULL,
	permission_id int(3) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE TABLE IF NOT EXISTS suppliers
(
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name varchar(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS areas
(
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name varchar(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS evaluations
(
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	user_id int(3) NOT NULL,
	supplier_id int(3) NOT NULL,
	request_date DATE NOT NULL,
	response_date DATE NOT NULL,
	order_date DATE NOT NULL,
	date_received DATE NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

CREATE TABLE IF NOT EXISTS purchases
(
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	supplier_id int(3) NOT NULL,
	area_id int(3) NOT NULL,
	deparment_id int(1) NOT NULL,
	order_no int(9) NOT NULL UNIQUE,
	order_total decimal(15,2) NOT NULL,
	order_type varchar(255) NOT NULL,
	order_description text NOT NULL,
	order_filepath text NOT NULL,
	order_filename text NOT NULL,
	purchase_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
	FOREIGN KEY (area_id) REFERENCES areas(id)
);

CREATE TABLE IF NOT EXISTS articles
(
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	purchase_id int(11) NOT NULL,
	area_id int(11) NOT NULL,
	code varchar(30) NOT NULL UNIQUE,
	description varchar(255) NOT NULL,
	price decimal(15,2) NOT NULL,
	FOREIGN KEY (purchase_id) REFERENCES purchases(id),
	FOREIGN KEY (area_id) REFERENCES areas(id)
);

CREATE TABLE IF NOT EXISTS articles_movements
(
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	article_id int(11) NOT NULL,
	area_start_id int(11) NOT NULL,
	area_end_id int(11) NOT NULL,
	movement varchar(255) NOT NULL,
	movement_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (article_id) REFERENCES articles(id),
	FOREIGN KEY (area_start_id) REFERENCES areas(id),
	FOREIGN KEY (area_end_id) REFERENCES areas(id)
);

CREATE TABLE IF NOT EXISTS supplies
(
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	qty int(11) NOT NULL,
	description varchar(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS supplies_purchases
(
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	supplie_id int(11) NOT NULL,
	purchase_id int(11) NOT NULL,
	price decimal(15,2) NOT NULL,
	qty int(11) NOT NULL,
	movement_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (supplie_id) REFERENCES supplies(id),
	FOREIGN KEY (purchase_id) REFERENCES purchases(id)
);

CREATE TABLE IF NOT EXISTS supplies_movements
(
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	supplie_id int(11) NOT NULL,
	area_id int(11) NOT NULL,
	qty int(11) NOT NULL,
	movement int(2) NOT NULL,
	movement_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (supplie_id) REFERENCES supplies(id),
	FOREIGN KEY (area_id) REFERENCES areas(id)
);