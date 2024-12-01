async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '312c8cdcb18fcea35ae14ae53956c8c6'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        localStorage.setItem('weatherData', JSON.stringify(data));
        await setCityBackgroundImage(city); 
        window.location.href = 'weather.html';
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
    
}

async function setCityBackgroundImage(city) {
    const unsplashApiKey = 'XIWr2Nt-1Cm4c15CFjfpqh-90ai3gPnn_4SfyESf5to'; 
    const query = `${city} landmarks, ${city} famous places, ${city} landscape`; 
    const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashApiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.ok && data.urls && data.urls.full) {
            const imageUrl = data.urls.full;
            console.log('Fetched image URL:', imageUrl);  
            localStorage.setItem('backgroundImage', imageUrl); 
        } else {
            console.log('No image found for this city');
            localStorage.setItem('backgroundImage', 'default_background.jpg');
        }
    } catch (error) {
        console.error('Error fetching Unsplash image:', error);
        localStorage.setItem('backgroundImage', 'default_background.jpg'); 
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('weather.html')) {
        const weatherData = JSON.parse(localStorage.getItem('weatherData'));
        if (weatherData) {
            displayWeather(weatherData);
        } else {
            document.getElementById('weather-result').innerHTML = '<p>No weather data found. Please go back and search again.</p>';
        }
        
        const backgroundImage = localStorage.getItem('backgroundImage');
        if (backgroundImage) {
            document.body.style.backgroundImage = `url(${backgroundImage})`;
        }
    }
});

function displayWeather(data) {
    const weatherHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    document.getElementById('weather-result').innerHTML = weatherHTML;
}
