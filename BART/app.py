import os
import json

import pandas as pd
import numpy as np
import csvmapper

# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
# from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/bellybutton.sqlite"
# db = SQLAlchemy(app)

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(db.engine, reflect=True)

# # Save references to each table
# Samples_Metadata = Base.classes.sample_metadata
# Samples = Base.classes.samples


# @app.route("/")
# def index():
#     """Return the homepage."""
#     return render_template("index.html")

df = pd.read_csv('db/Finalset.csv')

@app.route("/")
def index():
    df = pd.read_csv('db/Finalset.csv')
    chart_data = df.to_dict(orient='records')
    # chart_data = json.dumps(chart_data, indent=2)
    data = {'chart_data': chart_data}
    # print(chart_data)
    return render_template("index.html", data=data)

@app.route("/graphs")
def graphs():
  df = pd.read_csv('db/Finalset.csv')
  chart_data = df.to_dict(orient='records')
  # chart_data = json.dumps(chart_data, indent=2)
  data = {'chart_data': chart_data}
  # print(chart_data)
  return render_template("graphs.html", data=data)

@app.route("/map")
def map():

  return render_template("map.html")


@app.route("/pie")
def pie():

  return render_template("pie.html")

@app.route("/about")
def about():

  return render_template("data.html")


# @app.route("/data")
# def data():
#   data=list(collection.find({},{"_id":False}))

#   return jsonify(data) 


@app.route("/names")
def names():
    """Return a list of sample stations."""

    # Use Pandas to perform the sql query
    # stmt = db.session.query(Samples).statement
    # df = pd.read_sql_query(stmt, db.session.bind)

    # # Return a list of the column names (sample names)
    # return jsonify(list(df.columns)[2:])

    df = pd.read_csv('db/Finalset.csv')
    chart_data = df.to_dict(orient='records')
    # chart_data = json.dumps(chart_data, indent=2)
    data = {'chart_data': chart_data}
    unique = df['Station'].unique()
    # print(unique)
    # print(chart_data)
    return jsonify(list(df['Station'].unique())[0:])

@app.route("/all")
def all():
    """Return a list of sample stations."""

    # Use Pandas to perform the sql query
    # stmt = db.session.query(Samples).statement
    # df = pd.read_sql_query(stmt, db.session.bind)

    # # Return a list of the column names (sample names)
    # return jsonify(list(df.columns)[2:])

    df = pd.read_csv('db/Finalset.csv')
    # df = df.groupby(['Station','Total'])
    chart_data = df.to_dict(orient='records')
    chart_data = json.dumps(chart_data, indent=2)
    # data = {'chart_data': chart_data}
    # unique = df['Station'].unique()
    # print(unique)
    # print(chart_data)
    return chart_data


# @app.route("/metadata/<sample>")
# def sample_metadata(sample):
#     """Return the MetaData for a given sample."""
#     df = pd.read_csv('db/Finalset.csv')
#     sel = [
#         df['Station'],
#         df['Total'],
#         df['DateTime'],
#         df['Day'],
#         df['Hour'],
#         # Samples_Metadata.AGE,
#         # Samples_Metadata.LOCATION,
#         # Samples_Metadata.BBTYPE,
#         # Samples_Metadata.WFREQ,
#     ]
#     # print(sel)


#     # fields = ('Station', 'DateTime', 'Day', 'Hour', 'Total')
#     # parser = CSVParser('db/Finalset.csv', csvmapper.FieldMapper(fields))

#     # converter = csvmapper.JSONConverter(parser)

#     # print (converter.doConvert(pretty=True))

#     df = pd.read_csv('db/Finalset.csv')
#     results = df.to_dict(orient='records')
#     # chart_data = json.dumps(chart_data, indent=2)
#     # return (chart_data)
#     # return jsonify(list(df['Station'])[2:])
#     # print(results)
#     # resultsJson = json.dumps(results, indent=2)
#     # print(resultsJson)

#     # Create a dictionary entry for each row of metadata information
#     sample_metadata = {}
#     for result in results:
#         result[0]
#         result[1]
#         # sample_metadata["Total"] = result[2]
#         # sample_metadata["AGE"] = result[3]
#         # sample_metadata["LOCATION"] = result[4]
#         # sample_metadata["BBTYPE"] = result[5]
#         # sample_metadata["WFREQ"] = result[6]
#         # print(sample_metadata)
#     # print(sample_metadata)
#     # print(sample_metadata)
#     return jsonify(sample_metadata)


@app.route("/samples/<sample>")
def samples(sample):
    """Return `otu_ids`, `otu_labels`,and `sample_values`."""
    # stmt = db.session.query(Samples).statement
    # df = pd.read_sql_query(stmt, db.session.bind)
    df = pd.read_csv('db/Finalset.csv')

    # Filter the data based on the sample number and
    # only keep rows with values above 1
    sample_data = df.loc[df['Station'] == sample, ["Station", "Day", "Hour", "Total"]]
    # Format the data to send as json
    data = {
        "station": sample_data.Station.values.tolist(),
        "day": sample_data.Day.values.tolist(),
        "hour": sample_data.Hour.tolist(),
        "sample_values": sample_data.Total.tolist(),
    }
    return jsonify(data)
  
@app.route("/barchart/")
def barchart():
    """Return `otu_ids`, `otu_labels`,and `sample_values`."""
    # stmt = db.session.query(Samples).statement
    # df = pd.read_sql_query(stmt, db.session.bind)
    df = pd.read_csv('db/Finalset.csv')

    # Filter the data based on the sample number and
    # only keep rows with values above 1
    sample_bardata = df.loc[df['Total'] > 0, ["Station", "Day", "Hour", "Total"]]
    # Format the data to send as json
    bardata = {
        "station": sample_bardata.Station.values.tolist(),
        "day": sample_bardata.Day.values.tolist(),
        "hour": sample_bardata.Hour.tolist(),
        "sample_values": sample_bardata.Total.tolist(),
    }
    return jsonify(bardata)


if __name__ == "__main__":
    app.run()
