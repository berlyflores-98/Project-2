DROP TABLE IF exists countries ;

CREATE TABLE countries (
   country_id INT PRIMARY KEY,
    country_name varchar
);
    
SELECT 
     *
FROM
  countries;
	
DROP TABLE IF exists movies ;

CREATE TABLE movies (
	netflixid INT PRIMARY KEY,
	country_id INT REFERENCES countries(country_id),
	title varchar,
	image varchar,
	synopsis varchar,
	rating int,
	type varchar,
	relased int,
	runtime varchar,
	largeimage varchar,
	unogsdate date,
	imbdid int,
	download varchar
);

SELECT 
  *
FROM
   movies;
	
DROP TABLE IF exists genre ;

CREATE TABLE genre (
	id serial primary key,
 	netflixid int REFERENCES movies(netflixid),
	genre varchar,
 	title varchar
 );

 SELECT 
    *
 FROM
    genre;
	