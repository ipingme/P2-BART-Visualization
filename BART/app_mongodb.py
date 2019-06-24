import datetime
from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/bart_db"
mongo = PyMongo(app)
# Total_data = mongo.db.segment.find_one()


# Total_data = mongo.db.segment.find( { 'Total': { $gt: '0' } } )
# print(Total_data)


@app.route('/stars', methods=['GET'])
def get_all_stars():
 star = mongo.db.segment
 output = []
 for s in star.find():
   output.append({'Station' : s['Station'], 'Day' : s['Day'], 'Hour' : s['Hour'], 'Total' : s['Total']})
 return jsonify({'result' : output})



@app.route("/")
def index():
    
    return render_template("index.html")

@app.route("/graphs", methods=['GET', 'POST'])
def graphs():
    
  return render_template("graphs.html")

@app.route("/map")
def map():

  return render_template("map.html")


@app.route("/pie")
def pie():

  return render_template("pie.html")

@app.route("/about")
def about():

  return render_template("data.html")


@app.route("/all")
def all():
    """Return a list of sample stations."""

    all = mongo.db.segment.find()
    return jsonify({'all' : all})


@app.route("/stations")
def stations():
    """Return a list of sample stations."""

    stations = mongo.db.segment.distinct( "Station" )
    return jsonify({'station' : stations})

@app.route("/days")
def day():
    """Return a list of sample stations."""

    days = mongo.db.segment.distinct( "Day" )
    return jsonify({'days' : days})

@app.route("/hours")
def hour():
    """Return a list of sample stations."""

    # hour = mongo.db.segment.find().sort({"Hour":-1})
    hour = mongo.db.segment.distinct( "Hour" )
    # >db.userdetails.find().sort({"education":1})

    return jsonify({'hour' : hour})

@app.route("/datalist")
def datalist():
    Total_data = mongo.db.segment.find({})
    # print(Total_data)
    return jsonify({'result' : Total_data})


# @app.route("/metadata/<sample>")
# def sample_metadata(sample):
#     """Return the MetaData for a given sample."""
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

#     results = [df['Station'],df['Total']]
#     print(results)

#     # Create a dictionary entry for each row of metadata information
#     sample_metadata = {}
#     for result in results:
#         sample_metadata["Station"] = result[0]
#         sample_metadata["Total"] = result[1]
#         # sample_metadata["Total"] = result[2]
#         # sample_metadata["AGE"] = result[3]
#         # sample_metadata["LOCATION"] = result[4]
#         # sample_metadata["BBTYPE"] = result[5]
#         # sample_metadata["WFREQ"] = result[6]
#         # print(sample_metadata)
#     # print(sample_metadata)
#     # print(sample_metadata)
#     return 


# @app.route("/samples/<sample>")
# def samples(sample):
#     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the sample number and
#     # only keep rows with values above 1
#     sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]
#     # Format the data to send as json
#     data = {
#         "otu_ids": sample_data.otu_id.values.tolist(),
#         "sample_values": sample_data[sample].values.tolist(),
#         "otu_labels": sample_data.otu_label.tolist(),
#     }
#     return jsonify(data)


if __name__ == "__main__":
    app.run()
