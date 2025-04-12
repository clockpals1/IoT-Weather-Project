from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)

# OpenWeatherMap API configuration
API_KEY = 'ebcee3224d50cbe75b3ab7ed07ac5844'
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_weather', methods=['POST'])
def get_weather():
    city = request.form.get('city')
    
    if not city:
        return jsonify({'error': 'Please enter a city name'}), 400

    try:
        # Make API request
        params = {
            'q': city,
            'appid': API_KEY,
            'units': 'metric'  # For Celsius
        }
        response = requests.get(BASE_URL, params=params)
        data = response.json()

        if response.status_code == 200:
            weather_data = {
                'city': data['name'],
                'country': data['sys']['country'],
                'temperature': round(data['main']['temp']),
                'feels_like': round(data['main']['feels_like']),
                'humidity': data['main']['humidity'],
                'wind_speed': round(data['wind']['speed'] * 3.6, 1),  # Convert to km/h
                'description': data['weather'][0]['description'].capitalize(),
                'icon': data['weather'][0]['icon']
            }
            return jsonify(weather_data)
        else:
            return jsonify({'error': 'City not found'}), 404

    except Exception as e:
        return jsonify({'error': 'An error occurred'}), 500

if __name__ == '__main__':
    app.run(debug=True)
