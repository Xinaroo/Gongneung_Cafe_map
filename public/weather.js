const lat = 37.6248431089169;
const lon = 127.073821318894;
const apiKey = '7706f4c9e882f0ae506d1ec6d484f81a'; 

const getWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
        const response = await axios.get(url);
        const { main, weather } = response.data;
        
        const weatherBox = document.getElementById('weather-info');
        weatherBox.innerHTML = ''; // 기존 내용을 지웁니다.

        const weatherIcon = document.createElement('img');
        const weatherCondition = weather[0].main.toLowerCase();

        if (weatherCondition.includes('cloud')) {
            weatherIcon.src = 'weatherimg/Cloudy.png';
        } else if (weatherCondition.includes('clear')) {
            weatherIcon.src = 'weatherimg/Sunny.png';
        } else if (weatherCondition.includes('rain')) {
            weatherIcon.src = 'weatherimg/Rain.png';
        } else if (weatherCondition.includes('snow')) {
            weatherIcon.src = 'weatherimg/Snow.png';
        }

        weatherBox.appendChild(weatherIcon);

        const tempMax = document.createElement('div');
        tempMax.innerHTML = `최고 온도: ${main.temp_max}°C`;
        weatherBox.appendChild(tempMax);

        const tempMin = document.createElement('div');
        tempMin.innerHTML = `최저 온도: ${main.temp_min}°C`;
        weatherBox.appendChild(tempMin);

        const humidity = document.createElement('div');
        humidity.innerHTML = `습도: ${main.humidity}%`;
        weatherBox.appendChild(humidity);

        const rainProbability = document.createElement('div');
        rainProbability.innerHTML = ` ${weather[0].description}`;
        weatherBox.appendChild(rainProbability);

    } catch (error) {
        console.error('Error fetching weather data', error);
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
