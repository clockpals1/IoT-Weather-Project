document.getElementById('weather-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const cityInput = document.getElementById('city-input');
    const weatherInfo = document.querySelector('.weather-info');
    const errorMessage = document.querySelector('.error-message');
    
    try {
        const formData = new FormData();
        formData.append('city', cityInput.value);
        
        const response = await fetch('/get_weather', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Hide error message if it was previously shown
            errorMessage.style.display = 'none';
            
            // Update weather information
            document.querySelector('.city').textContent = data.city;
            document.querySelector('.country').textContent = data.country;
            document.querySelector('.temperature').textContent = `${data.temperature}°C`;
            document.querySelector('.feels-like').textContent = `${data.feels_like}°C`;
            document.querySelector('.humidity').textContent = `${data.humidity}%`;
            document.querySelector('.wind-speed').textContent = `${data.wind_speed} km/h`;
            document.querySelector('.description').textContent = data.description;
            document.querySelector('.weather-icon').src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
            
            // Show weather info
            weatherInfo.style.display = 'block';
        } else {
            // Show error message
            errorMessage.textContent = data.error;
            errorMessage.style.display = 'block';
            weatherInfo.style.display = 'none';
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'An error occurred while fetching the weather data.';
        errorMessage.style.display = 'block';
        weatherInfo.style.display = 'none';
    }
});
