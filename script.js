async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'ce36c496564fb578ea0d3f07f946712b'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function displayWeather(data) {
    const weatherHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    const weatherApp = document.querySelector('.weather-app');
    weatherApp.innerHTML = weatherHTML;
}
