function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
        "SUNDAY", 
        "MONDAY", 
        "TUESDAY", 
        "WEDNESDAY", 
        "THURSDAY", 
        "FRIDAY", 
        "SATURDAY"
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let locationElement = document.querySelector("#location");
    let conditionsElement = document.querySelector("#weather-conditions")
    let humidityElement = document.querySelector("#humidity");
    let feelsElement = document.querySelector("#feels-temp");
    let dateElement = document.querySelector("#date");

    temperatureElement.innerHTML = Math.round (response.data.main.temp);
    locationElement.innerHTML = response.data.name;
    conditionsElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    feelsElement.innerHTML = Math.round (response.data.main.feels_like);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "0f1996bbebf340db45987ce9fc344036";
let city = "Chicago";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);