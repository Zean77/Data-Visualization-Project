def find_top_daily_vaccinations(n = 20):

  import pandas as pd

  vaccine_df=pd.read_csv("Country Vaccine Data.csv")
  by_Residence_Region = vaccine_df.groupby('country').sum()[['daily_vaccinations']]
  num_vacc = by_Residence_Region.nlargest(n, 'daily_vaccinations')[['daily_vaccinations']]
  return num_vacc


num_vacc=find_top_daily_vaccinations()
pairs=[(Residence_Region,daily_vaccinations) for Residence_Region,daily_vaccinations in zip(num_vacc.index,num_vacc['daily_vaccinations'])]


import folium
import pandas as pd
vaccine_df = pd.read_csv("Country Vaccine Data.csv")
vaccine_df=vaccine_df[['Lat','Long_','daily_vaccinations']]
vaccine_df=vaccine_df.dropna()

m=folium.Map(location=[26,38],
            tiles='Stamen toner',
            zoom_start=2)

def circle_maker(x):
    folium.Circle(location=[x[0],x[1]],
                 radius=float(x[2]),
                 color="red",
                 popup='Greatest number of vaccines in a single day:{}'.format(x[2])).add_to(m)
vaccine_df.apply(lambda x:circle_maker(x),axis=1)

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
# @app.route("/api/v1.0/Michigan/Michigan_Vaccine")
# def Michigan():
#     return render_template("")
    
if __name__=="__main__":
    app.run(debug=True)