const weatherStatus = document.getElementById("weather-status");

const WEATHER_API_URL =
    "https://api.open-meteo.com/v1/forecast?latitude=50.88790&longitude=-115.13840&current_weather=true";

async function fetchWeather() {
    try {
        const response = await fetch(WEATHER_API_URL);

        if (!response.ok) {
            throw new Error(`Network error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.current_weather) {
            throw new Error("Missing weather data.");
        }

        const { temperature, windspeed, weathercode } = data.current_weather;

        weatherStatus.innerHTML = `
            <p><strong>Temperature:</strong> ${temperature} °C</p>
            <p><strong>Wind Speed:</strong> ${windspeed} km/h</p>
            <p><strong>Weather Code:</strong> ${weathercode}</p>
        `;
    } catch (error) {
        weatherStatus.innerHTML = `
            <p>Unable to load live weather data.</p>
            <p>Please try again later.</p>
        `;
    }
}

fetchWeather();