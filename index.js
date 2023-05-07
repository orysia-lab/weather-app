let now = new Date();

let p = document.querySelector("#date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[new Date().getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

p.innerHTML = `${day}, ${hour}:${minutes}`;


function searchAnotherCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = cityForm.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  searchAnotherCity(cityInput.value);
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", searchAnotherCity);


function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let showTemp = document.querySelector("#current-temp");
  showTemp.innerHTML = `${temperature}`;
  let changeCity = document.querySelector("#city");
  changeCity.innerHTML = response.data.name;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "02c067fbe0a95f847d98a3fc4fe7414d";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentPosition(position) {
  let apiKey = "02c067fbe0a95f847d98a3fc4fe7414d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  let showCurrentPosition = document.querySelector("#latitude-longtitude");
  showCurrentPosition.innerHTML = `Latitude: ${lat} Longtitude:${lon}`;
  axios.get(apiUrl).then(showWeather);
}
cityForm.addEventListener("submit", searchCity);


cityForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", searchCity);
