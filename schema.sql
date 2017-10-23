CREATE DATABASE bamazon;
Use bamazon;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NULL,-
  department_name VARCHAR(30) NULL,
  price INTEGER(10),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bike", "sports" 100, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dresses", "womens" 50, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shirts", "mens" 32, 875);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("baseballs", "sports" 3, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sweaters", "mens" 70, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoes", "womens" 45, 1500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ties", "mens" 30, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jeans", "womens" 25, 2000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("basketballs", "sports" 20, 700);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("footballs", "sports" 30, 1100);