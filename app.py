from flask import Flask, render_template, jsonify
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import numpy as np
import pandas as pd

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# # Database Set Up 
url = 'postgres://fdcftdhewdyqvh:28a4642cad69d69b6065c15fa11d97719397b94c0cfb460554560c80b81ce864@ec2-54-163-47-62.compute-1.amazonaws.com:5432/d15vhqvdffuqdg'
engine = create_engine(url)


@app.route('/')
def home():
    
    return(f"Welcome! <br> \n /top_releases")

@app.route("/latest_release")
def latest_release():

    #Query
    query_string = 'select * from movies join countries on movies.countryid = countries.id order by countryid, rating DESC'
    results_pd = pd.read_sql_query(f"{query_string}",con=engine)

    movies_list = []
    for index, row in results_pd.iterrows():
        movie_dict = {}
        movie_dict['countryName'] = row['country_name']
        movie_dict['title'] = row['title']
        movie_dict['image'] = row['image']
        movie_dict['synopsis'] = row['synopsis']
        movie_dict['rating'] = row['rating']
        movie_dict['type'] = row['type']
        movie_dict['releasedYear'] = row['released']
        movie_dict['runtime'] = row['runtime']
        movie_dict['dateAdded'] = row['unogsdate']
        movies_list.append(movie_dict)
    
    return jsonify(movies_list)

@app.route("/rating_country")
def rating_country():

    #Query
    query_string = 'select countries.country_name, round(avg(movies.rating)::numeric,1) from movies join countries on movies.countryid = countries.id group by countries.country_name order by countries.country_name'
    results_pd = pd.read_sql_query(f"{query_string}",con=engine)

    country_rating_list = []
    for index, row in results_pd.iterrows():
        country_rating_dict = {}
        country_rating_dict['countryName'] = row['country_name']
        country_rating_dict['countryRating'] = row['round']
        country_rating_list.append(country_rating_dict)

    return jsonify(country_rating_list)

@app.route("/genre_country")
def genre_country():

    #Query
    query_string = 'select c.country_name, genre.genre from genre join countries as c on genre.countryid = c.id order by c.country_name'
    # Manipulate table to create count of genre per country
    genre_df = pd.read_sql_query(f"{query_string}",con=engine)
    genre_df['new_genre'] =  genre_df.genre.str.split(", ").str[0]
    results_pd = genre_df.groupby(['country_name','new_genre']).count().reset_index()

    genre_list = []
    for index, row in results_pd.iterrows():
        genre_dict = {}
        genre_dict['countryName'] = row['country_name']
        genre_dict['genre'] = row['new_genre']
        genre_dict['genreCount'] = row['genre']
        genre_list.append(genre_dict)

    return jsonify(genre_list)

if __name__ == '__main__':
    app.run(debug=True)