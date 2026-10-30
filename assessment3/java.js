/* ------------------------------------------------------------
   Fetch live weather data for a sample location
   ------------------------------------------------------------ */

const weatherStatus = document.getElementById("weather-status");

// Example: Open-Meteo free API (no key required)
const WEATHER_API_URL =
    "https://api.open-meteo.com/v1/forecast?latitude=50.88790&longitude=-115.13840&current_weather=true";

async function fetchWeather() {
    try {
        const response = await fetch(WEATHER_API_URL, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
        }

        const data = await response.json();

        if (!data.current_weather) {
            throw new Error("Weather data missing in API response.");
        }

        const { temperature, windspeed, weathercode } = data.current_weather;

        weatherStatus.innerHTML = `
            <p><strong>Temperature:</strong> ${temperature} °C</p>
            <p><strong>Wind speed:</strong> ${windspeed} km/h</p>
            <p><strong>Weather code:</strong> ${weathercode}</p>
        `;
    } catch (error) {
        console.error("Weather fetch error:", error);
        weatherStatus.innerHTML = `
            <p>Unable to load live weather data right now.</p>
            <p>Please check your network connection or try again later.</p>
        `;
    }
}

fetchWeather();
