# Project 2 – Latest Releases on Netflix Across the World

## Group Members
- Samuel Fonseca 
- Charles Robinson
- Kimberly Flores
- Kiran Mundae

## Overview of Project:
This application creates visualizations based on data gathered by the API of uNoGS (Unofficial Netflix Online Global Search). It allows the user to gain insight on the latest release (movies or shows) available globally in the last 7 days. The application shows the average rating and titles of the movies released in each country.

## How to Re-Create this Application:
1.	Clone the repository to your computer.
2.	Ensure all software requirements from the Requirements.txt are met prior to starting application.
3.	Create database in Postgres SQL – need to create three tables by running schema.sql to be filled and queried.
4.	Run the API_call Jupyter notebook to mine, clean and create three dataframes (countries_df, latest_releases_df, genres_df) to be used in SQL.
5.	SQL will store the data and return it back to the notebook to be used in Python Flask application. The tables filled are connected to Heroku for global access. 
6.	Run Flask application app.py in bash/command window using python app.py command.
7.	Open webpage by using http://localhost:5000.

## Heroku Deployment:
https://netflix-project2.herokuapp.com/



