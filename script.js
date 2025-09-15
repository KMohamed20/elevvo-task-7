const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap key
const weatherContainer = document.getElementById('weatherContainer')

// Fetch weather for a city
async function fetchWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    if (!response.ok) throw new Error('City not found')

    const data = await response.json()
    addWeatherCard(data)
  } catch (error) {
    showError(error.message)
  }
}

// Add a weather card to the DOM
function addWeatherCard(data) {
  const { name, main, weather, sys } = data

  const iconCode = weather[0].icon
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

  const card = document.createElement('div')
  card.className = 'weather-card'
  card.innerHTML = `
    <h2>${name}, ${sys.country}</h2>
    <img src="${iconUrl}" alt="${weather[0].description}" class="weather-icon">
    <div class="temp">${Math.round(main.temp)}°C</div>
    <p>${weather[0].description}</p>
    <div class="forecast">
      <div>
        <span>Feels Like</span>
        ${Math.round(main.feels_like)}°C
      </div>
      <div>
        <span>Humidity</span>
        ${main.humidity}%
      </div>
      <div>
        <span>Wind</span>
        ${Math.round(data.wind.speed)} km/h
      </div>
    </div>
  `
  weatherContainer.appendChild(card)
}

// Show error message
function showError(message) {
  weatherContainer.innerHTML = `<div class="error">${message}</div>`
}

// Show loading state
function showLoading() {
  weatherContainer.innerHTML = `<div class="loading">Loading weather data...</div>`
}

// Search handler
document.getElementById('searchBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim()
  if (city) {
    showLoading()
    fetchWeather(city)
  }
})

// Allow Enter key
document.getElementById('cityInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('searchBtn').click()
  }
})

// Load default city on load
fetchWeather('Paris')
