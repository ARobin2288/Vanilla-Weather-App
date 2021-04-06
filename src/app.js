function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let locationElement = document.querySelector("#location");
    let conditionsElement = document.querySelector("#weather-conditions")
    let humidityElement = document.querySelector("#humidity");
    let feelsElement = document.querySelector("#feels-temp");
    let sunriseElement = document.querySelector("#sunrise-time");
    let sunsetElement = document.querySelector("#sunset-time");
    temperatureElement.innerHTML = Math.round (response.data.main.temp);
    locationElement.innerHTML = response.data.name;
    conditionsElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    feelsElement.innerHTML = Math.round (response.data.main.feels_like);
    sunriseElement.innerHTML = response.data.sys.sunrise;
    sunsetElement.innerHTML = response.data.sys.sunset;
}

let apiKey = "0f1996bbebf340db45987ce9fc344036";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);