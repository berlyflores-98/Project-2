from flask import Flask, render_template, jsonify
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import numpy as np
import pandas as pd
import os
import json

# # For Pull data route
# from config import headers 
# import requests
# from pprint import pprint
# from sqlalchemy import inspect

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# # # Database Set Up 
url = 'postgres://fdcftdhewdyqvh:28a4642cad69d69b6065c15fa11d97719397b94c0cfb460554560c80b81ce864@ec2-54-163-47-62.compute-1.amazonaws.com:5432/d15vhqvdffuqdg'
engine = create_engine(url)


@app.route('/')
def home():
    return render_template('map2.html')

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


@app.route('/geometries')
def geometries():
    data = json.load(os.path.join('./static/data/countries.json'))
    return jsonify(data)

# !!!Warning this route will create API calls, it may take a while...!!!
# @app.route('/repull_data')
# def data_pull_execution():

#     heroku_url = 'postgres://fdcftdhewdyqvh:28a4642cad69d69b6065c15fa11d97719397b94c0cfb460554560c80b81ce864@ec2-54-163-47-62.compute-1.amazonaws.com:5432/d15vhqvdffuqdg'
#     engine = create_engine(heroku_url)

#     engine.connect().execute("delete from genre")
#     engine.connect().execute("delete from movies")
#     engine.connect().execute("delete from countries")


#     ### Pull List of Countries Available From Netflix API
#     # Referenced URL
#     url = "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi"

#     # Query for List of Countries
#     querystring = {"t":"lc","q":"available"}
#     country_response = requests.request("GET", url, headers=headers, params=querystring)
#     # We will need the second value of every individual list, since it has the initials of each country, which will be used to make the lastest release API calls
#     country_response_json = country_response.json()['ITEMS']
#     # Populating data within lists
#     num_list = []
#     country_list = []
#     country_name_list = []

#     for num, country in enumerate(country_response_json):
#         num_list.append(num+1)
#         country_list.append(country[1].upper())
#         country_name_list.append(country[2])
#     # Set your df
#     countries_df = pd.DataFrame({"id": num_list,
#                             "country_in": country_list,
#                             "country_name": country_name_list})

#     ### Iterate through List of Countries and Make API Calls to Obtain Latest Release for Each Country
#     latest_release_responses = []

#     for i in country_list:
#         querystring = {"q":f"get:new1:{i}","p":"1","t":"ns","st":"adv"}
#         latest_release_response = requests.request("GET", url, headers=headers, params=querystring)
#         latest_release_responses.append(latest_release_response.json()['ITEMS'])

#     # Set up empty lists
#     netflixid_list = []
#     countryID_list = []
#     title_list = []
#     image_list = []
#     synopsis_list = []
#     rating_list = []
#     type_list = []
#     released_list = []
#     runtime_list = []
#     largeimage_list = []
#     unogsdate_list = []
#     imdbid_list = []
#     download_list = []
#     country_response_lengths = []

#     # Iterate through each country response
#     for i, response in enumerate(latest_release_responses):
#     # Get the lenght of the response to iterate over for next loop
#         country_response_lengths.append(len(latest_release_responses[i]))
#     # Iterate over length of response for each country
#         for j, country_response in enumerate(response):
#             if response[j]['rating'] != "":
#                 netflixid_list.append(response[j]['netflixid'])
#                 countryID_list.append(i + 1)
#                 title_list.append(response[j]['title'])
#                 image_list.append(response[j]['image'])
#                 synopsis_list.append(response[j]['synopsis'])
#                 rating_list.append(response[j]['rating'])
#                 type_list.append(response[j]['type'])
#                 released_list.append(response[j]['released'])
#                 runtime_list.append(response[j]['runtime'])
#                 largeimage_list.append(response[j]['largeimage'])
#                 unogsdate_list.append(response[j]['unogsdate'])
#                 imdbid_list.append(response[j]['imdbid'])
#                 download_list.append(response[j]['download'])

#     # Turn Lists into a Dataframe
#     latest_release_df = pd.DataFrame({"netflixid": netflixid_list,
#                                  "countryid": countryID_list,
#                                   "title": title_list,
#                                   "image": image_list,
#                                   "synopsis": synopsis_list,
#                                   "rating": rating_list,
#                                   "type": type_list,
#                                   "released": released_list,
#                                   "runtime": runtime_list,
#                                   "largeimage": largeimage_list,
#                                   "unogsdate": unogsdate_list,
#                                   "imdbid": imdbid_list,
#                                   "download": download_list
#                                  })
    

#     ### Pull Genre Information
#     genre_list = []

#     #Iterate over netflix IDs to pull response
#     for i in netflixid_list:
#         querystring = {"t":"getimdb","q":f"{i}"}
#         genre_response = requests.request("GET", url, headers=headers, params=querystring)
#         genre_list.append(genre_response.json()['genre'])

#     #Create new table for genres
#     genres_df = pd.DataFrame({"netflixid": netflixid_list,
#                             "countryid": countryID_list,
#                             "title": title_list,
#                             "genre": genre_list})

#     ### Connect to Heroku Database
#     url = 'postgres://fdcftdhewdyqvh:28a4642cad69d69b6065c15fa11d97719397b94c0cfb460554560c80b81ce864@ec2-54-163-47-62.compute-1.amazonaws.com:5432/d15vhqvdffuqdg'
#     engine = create_engine(url)

#     ### Load Data into Tables
#     countries_df.to_sql(name='countries', con=engine, if_exists='append', index=False)
#     latest_release_df.to_sql(name='movies', con=engine, if_exists='append', index=False)
#     genres_df.to_sql(name='genre', con=engine, if_exists='append', index=False)

#     # ### Confirm data has been added by querying the tables

#     # genre_df = pd.read_sql_query('select  c.country_name, genre.genre from genre join countries as c on genre.countryid = c.id order by c.country_name', con=engine)
#     # genre_df['new_genre'] =  genre_df.genre.str.split(", ").str[0]
#     # genre_df = genre_df.groupby(['country_name','new_genre']).count().reset_index()
    
#     print("Pull is complete")
    
#     return render_template('map2.html')

if __name__ == '__main__':
    app.run(debug=True)
