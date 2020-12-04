DROP TABLE IF exists countries ;

CREATE TABLE countries (
    id SERIAL primary key,
    country_in varchar,
    country_name varchar
);
    
SELECT 
     *
FROM
  countries;
	
DROP TABLE IF exists movies ;

CREATE TABLE movies (
	id SERIAL primary key,
	netflixid INT,
	countryid INT REFERENCES countries(id),
	title varchar,
	image varchar,
	synopsis varchar,
	rating float,
	type varchar,
	released int,
	runtime varchar,
	largeimage varchar,
	unogsdate date,
	imdbid varchar,
	download varchar
);

SELECT 
  *
FROM
   movies;
	
DROP TABLE IF exists genre ;

CREATE TABLE genre (
	id serial primary key,
 	netflixid int,
    countryid INT REFERENCES countries(id),
 	title varchar,
	genre varchar
 );

 SELECT 
    *
 FROM
    genre;
	