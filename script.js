const locationInput = document.getElementById('locationInput');
const getWeatherButton = document.getElementById('getWeather');
const weatherInfo = document.getElementById('weatherInfo');

// Function to get the day name from a date string
function getDayName(dateString) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return days[date.getDay()];
}

// Function to fetch and display weather data
function getWeather(location) {
    fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=91b4369798474fee84b51233233010&q=${location}&days=3&aqi=no`
    )
        .then(response => response.json())
        .then(data => {
            const currentWeatherHtml = `<div class='weathercontainer'> 
            <div class='row'><h2> ${data?.location?.name}<div>${data?.current?.temp_c}<sup>o</sup>C</div></h2>  </div>
            <div class="content">
            <div class="first">
                <div class='row'> <span>Temperature</span> <span>${data?.current?.temp_c}<sup>o</sup>C</span>  </div>
                <div class='row'> <span>Feels Like</span> <span>${data?.current?.feelslike_c}<sup>o</sup>C</span>  </div>
                <div class='row'> <span>Condition</span> <span>${data?.current?.condition?.text}</span>  </div>
                </div>
                <div class="secound">
                <div class='row'> <span>Wind_dir</span> <span>${data?.current?.wind_dir}</span>  </div>
                <div class='row'> <span>Humidity</span><span>${data?.current?.humidity}<sup>%</sup></span>  </div>
                <div class='row'> <span>wind_degree</span><span>${data?.current?.wind_degree}<sup></sup></span>  </div>
                </div>
                </div>
            </div>`;

            let forecastHtml = '<div class="forecast-container">';
            for (let i = 0; i < 3; i++) {
                const forecast = data?.forecast?.forecastday[i];
                const dayName = getDayName(forecast?.date);
                forecastHtml += `<div class="forecast-day">
                    <h3>${dayName}</h3>
                    <p>${forecast?.day?.condition?.text}</p>
                   
                </div>`;
            }
            forecastHtml += '</div>';

            weatherInfo.innerHTML = currentWeatherHtml + forecastHtml;

            // Display sunrise, sunset, moonrise, and moonset times
            const sunriseTime = data?.forecast?.forecastday[0]?.astro?.sunrise;
            const sunsetTime = data?.forecast?.forecastday[0]?.astro?.sunset;
            const moonriseTime = data?.forecast?.forecastday[0]?.astro?.moonrise;
            const moonsetTime = data?.forecast?.forecastday[0]?.astro?.moonset;

            weatherInfo.innerHTML += `<div class="additional-info">
                <div class="row-time"><span class="times">Sunrise</span><div>${sunriseTime}</div></div>
                <div class="row-time"><span class="times">Sunset</span><div>${sunsetTime}</div></div>
                <div class="row-time"><span class="times">Moonrise</span><div>${moonriseTime}</div></div>
                <div class="row-time"><span class="times">Moonset</span><div>${moonsetTime}</div></div>
            </div>`;
        })
        .catch(error => {
            weatherInfo.innerHTML = `Error: ${error.message}`;
        });
}

// Set default value for location input
locationInput.value = "Karachi";

// Call getWeather function when the page loads
window.addEventListener('load', () => {
    getWeather(locationInput.value);
});

// Call getWeather function when the "Get Weather" button is clicked
getWeatherButton.addEventListener('click', () => {
    const location = locationInput.value;
    getWeather(location);
});
