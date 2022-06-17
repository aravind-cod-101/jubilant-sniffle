-- for help => \?
-- for creating a new database 
CREATE DATABASE yelp;
-- switching to a new database  => \c databasename
-- list all tables => \d
-- list all columns in a table => \d tablename

-- yelp database
-- setting up a table 
CREATE TABLE restaurants
(
    id INT,
    name VARCHAR(50),
    location VARCHAR(50),
    price_range INT
);

INSERT INTO restaurants
    (name,location,price)
VALUES('Al-Buhari', 'Chennai', 3);

INSERT INTO restaurants
    (name,location,price)
VALUES('Manoj Bhavan', 'Chennai', 5);


CREATE TABLE restaurants
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price INT NOT NULL check(price >=1 and price <=5),

);



CREATE TABLE reviews
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT check(rating>=1 and rating <=5)
);