import datetime as dt
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

import requests
import json

engine = create_engine("sqlite:///../Saif/static/data/Vaccine_DB.db")
Base = automap_base()
Base.prepare(engine, reflect=True)

print(Base.classes.keys())

Country_Vaccine = Base.classes.Country_Vaccination_Progress

# Create our session (link) from Python to the DB
session = Session(engine)
  
# Query all data
results = session.query(
  Country_Vaccine.id,
  Country_Vaccine.country,
  Country_Vaccine.Initials,
  Country_Vaccine.Total_Vaccination,
  Country_Vaccine.People_Vaccinated,
  Country_Vaccine.Daily_Vaccination,
  Country_Vaccine.Daily_Vaccination_Per_Million,
  Country_Vaccine.Vaccine_Provider,
  Country_Vaccine.Latitude,
  Country_Vaccine.Longtitude).all()

session.close()

#Create a dictionary from the raw data and append to a list of all_info
all_info = []
for id, country, initials, total_vaccination, people_vaccinated, daily_vaccination, daily_vaccination_per_million, vaccine_provider, latitude, longtitude in results:
  country_info ={}
  country_info["id"] = id
  country_info["country"] = country
  country_info["initials"] = initials
  country_info["total_vaccination"] = total_vaccination
  country_info["people_vaccinated"] = people_vaccinated
  country_info["daily_vaccination"] = daily_vaccination
  country_info["daily_vaccination_per_million"] = daily_vaccination_per_million
  country_info["vaccine_provider"] = vaccine_provider
  country_info["latitude"] = latitude
  country_info["longtitude"] = longtitude
  all_info.append(country_info)

#Convert query results to DataFranme
vaccine_df = pd.DataFrame(all_info)

#Change data types
vaccine_df['daily_vaccination']=pd.to_numeric(vaccine_df['daily_vaccination'])
vaccine_df['total_vaccination']=pd.to_numeric(vaccine_df['total_vaccination'])
vaccine_df['people_vaccinated']=pd.to_numeric(vaccine_df['people_vaccinated'])
vaccine_df['daily_vaccination_per_million']=pd.to_numeric(vaccine_df['daily_vaccination_per_million'])


def find_top_daily_vaccinations(n = 20):
  by_Residence_Region = vaccine_df.groupby('country').sum()[['daily_vaccination']]
  num_vacc = by_Residence_Region.nlargest(n, 'daily_vaccination')[['daily_vaccination']]
  return num_vacc


num_vacc=find_top_daily_vaccinations()
pairs=[(Residence_Region,daily_vaccination) for Residence_Region,daily_vaccination in zip(num_vacc.index,num_vacc['daily_vaccination'])]


import folium
import pandas as pd
country_vaccine_df = vaccine_df
country_vaccine_df=country_vaccine_df[['latitude','longtitude','daily_vaccination']]
country_vaccine_df=country_vaccine_df.dropna()

m=folium.Map(location=[26,38],
            tiles='Stamen toner',
            zoom_start=2)

def circle_maker(x):
    folium.Circle(location=[x[0],x[1]],
                 radius=float(x[2]),
                 color="red",
                 popup='Greatest number of vaccines in a single day:{}'.format(x[2])).add_to(m)
country_vaccine_df.apply(lambda x:circle_maker(x),axis=1)

html_map=m._repr_html_()


from flask import Flask,render_template

app=Flask(__name__)
@app.route('/World')
def home():
    return render_template("home.html",table=num_vacc, cmap=html_map,pairs=pairs)

@app.route('/viz')
def Viz():
    return render_template("Data_Visualization_Page.html")

@app.route('/Michigan')
def Michigan():
    return render_template("Michigan_data_page.html")
  
@app.route('/')
def Home():
    return render_template("index.html")

    
if __name__=="__main__":
    app.run(debug=True)