from flask import Flask, render_template, jsonify
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import numpy as np
from config import pg_password
import pandas as pd

app = Flask(__name__)
# app.config['JSON_SORT_KEYS'] = False

# Database Set Up #
pg_user = 'postgres'
db_name = 'nameofdatabase' # Update with name of db
pg_password = 'password' # Update with password

connection_string = f"{pg_user}:{pg_password}@localhost:5432/{db_name}"
engine = create_engine(f'postgresql://{connection_string}')

@app.route('/')
def home():
    
    return(f"Welcome")

# @app.route("/latest_release")
# def movie_data():
#     #Query
#     results_pd = pd.read_sql_query('select * from movie_data', con=engine)
    
#     movie_list = []
    
#     for index, row in results_pd.iterrows():
#         movie_dict = {}
#         movie_dict["Film"] = row['film']
#         movie_dict["Year"] = row['year']
#         movie_dict["Netflix"] = row['netflix']
#         movie_dict["Hulu"] = row['hulu']
#         movie_dict["Amazon Prime"] = row['prime_video']
#         movie_dict["Disney"] = row['disney']
#         movie_dict["Revenue"] = row['revenue']
#         movie_dict["Budget"] = row['budget']
#         movie_dict["Profit"] = row['est_profit']
#         movie_list.append(movie_dict)


#     return jsonify(movie_list)

if __name__ == '__main__':
    app.run(debug=True)