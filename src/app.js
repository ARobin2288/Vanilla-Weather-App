function displayTemperature(response) {
    console.log(response.data.main.temp);
}

let apiKey = "0f1996bbebf340db45987ce9fc344036";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);