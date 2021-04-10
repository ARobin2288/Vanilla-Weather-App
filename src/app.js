function formatDate(timestamp) {
    let now = new Date(timestamp);

    let days = [
        "SUN", 
        "MON", 
        "TUES", 
        "WED", 
        "THURS", 
        "FRI", 
        "SAT"
    ];
    let day = days[now.getDay()];

    let months = [
	        "JANUARY",
	        "FEBRUARY",
	        "MARCH",
	        "APRIL",
	        "MAY",
	        "JUNE",
	        "JULY",
	        "AUGUST",
	        "SEPTEMBER",
	        "OCTOBER",
	        "NOVEMBER",
	        "DECEMBER"
	      ];
	      let month = months[now.getMonth()];

    let date = now.getDate();
    let year = now.getFullYear();
    let hours = now.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${month} ${date}, ${year}  ${hours}:${minutes}`;
}

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

   let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
    forecastHTML = forecastHTML + 
            `
            <div class="col-2">
                <div class="day-one">
                    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="46" id="icons"/>
                    <div id="weather-forecast-temperatures">
                        <p id= "six-temps">
                            <span id="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}° 
                            </span>|<span id="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}°</span>
                        </p>
                    </div>
                    <div id="forecast-date">${formatDay(forecastDay.dt)}</div>
                </div>
            </div>`;
           }
         })
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "0f1996bbebf340db45987ce9fc344036";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let locationElement = document.querySelector("#location");
    let conditionsElement = document.querySelector("#weather-conditions")
    let humidityElement = document.querySelector("#humidity");
    let feelsElement = document.querySelector("#feels-temp");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#conditions-icon");
    let windElement = document.querySelector("#wind");

    fahrenheitTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round (fahrenheitTemperature);
    locationElement.innerHTML = response.data.name;
    conditionsElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    feelsElement.innerHTML = Math.round (response.data.main.feels_like);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    windElement.innerHTML = Math.round(response.data.wind.speed);

    getForecast(response.data.coord);
}

function search(city) {
let apiKey = "0f1996bbebf340db45987ce9fc344036";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let searchbarElement = document.querySelector("#searchbar");
    search(searchbarElement.value);
}

function displayCelciusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    fahrenheitLink.classList.remove("active");
    celciusLink.classList.add("active");
    let celciusTemperature = (fahrenheitTemperature - 32) * 5 / 9;
    temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function searchLocation(position) {
    let apiKey = "0f1996bbebf340db45987ce9fc344036";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

    axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let currentLocationButton = document.querySelector("#home-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Chicago");