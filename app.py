from flask import Flask, render_template, request, redirect, url_for, session
import engine
from data import Data

app = Flask(__name__, static_url_path='/static')

app.debug = True
app.secret_key = "Nothing"


@app.route("/")
def IndexPage():
    return render_template('index.html')


@app.route("/forcast")
def forcastPage():
    return render_template('forcast.html')


@app.route("/Login")
def Login():
    return render_template('Login.html')


@app.route("/DashBoard")
def DashBoard():
    return render_template('dashboard.html')


rsh = ''


@app.route('/MapData', methods=['POST'])
def getmessage():
    crowd = request.form['Crowd']
    traffic = request.form['Traffic']
    greenery = request.form['Greenery']

    lat = request.form['lati']
    long = request.form['longi']
    distance = request.form['distance']
    print(lat, long)
    print(crowd, traffic, greenery)
    global rsh
    rsh, islaps = engine.main(lat, long, distance, crowd, traffic, greenery)
    if 'laps' in islaps:
        return {'map_name': rsh+'.html', 'warning': islaps['lap']}
    else:
        return {'map_name': rsh+'.html'}


@app.route('/FeedBack', methods=['POST'])
def FeedBack():
    OverallFeed = request.form['OverallFeed']
    Safety = request.form['Safety']
    Noise = request.form['Noise']
    Greenery = request.form['Greenery']
    Crowd = request.form['Crowd']
    print(Crowd, Noise)
    engine.submit(OverallFeed, Crowd, Noise, Safety, Greenery, rsh)
    return "Test"


@app.route('/future', methods=['POST'])
def forecast():
    dt = Data()
    start = {
        'long': 77.1166061999999999,  # lon,  ,
        'lat': 28.6320032  # lat
    }
    hours = request.form['distance']
    print(hours)
    dt.process_forecast_data(start['lat'], start['long'], hours)
    return "Test"


@app.errorhandler(404)
def error404(error):
    return render_template('404.html'), 404


if __name__ == "__main__":
    app.run()
