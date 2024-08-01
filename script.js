const API_KEY = '6b0f8e0e06a446518ce6a060073a6f17';

const map = L.map('map').setView([13.7604, 121.0551], 13); 


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


map.on('click', async (e) => {
    const { lat, lng } = e.latlng;

    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });


    const marker = L.marker([lat, lng]).addTo(map);

  
    const weatherData = await getWeatherData(lat, lng);


    displayWeatherInfo(weatherData);
});

async function getWeatherData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function displayWeatherInfo(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h3>Weather in ${data.name}</h3>
        <p>Temperature: ${data.main.temp.toFixed(2)}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed.toFixed(2)} m/s</p>
    `;
}