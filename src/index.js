function convertCtoF(celsius) {
  let fahrn = (celsius * 9) / 5 + 32;
  fahrn = Math.round(fahrn);
  return fahrn;
}

function convertFtoC(fahrn) {
  let celsius = ((fahrn - 32) * 5) / 9;
  celsius = Math.round(celsius);
  return celsius;
}

function upperCity(city) {
  let arrayCity = city.split(" ");
  for (let i = 0; i < arrayCity.length; i++) {
    arrayCity[i] = arrayCity[i].charAt(0).toUpperCase() + arrayCity[i].slice(1);
  }
  city = arrayCity.join(" ");
  return city;
}
let week = [
  "Sunday",
  "Monday",
  "Tuseday",
  "Wednesday",
  "Thurthday",
  "Friday",
  "Saturday",
];
let monthes = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let today = document.querySelector("#data-today");
let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
today.innerHTML = `${now.getDate()} ${monthes[now.getMonth()]}, ${
  week[now.getDay()]
} ${hours}:${minutes}`;

function showDegreeFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#today-temperature");
  temperature.innerHTML = convertCtoF(temperature.innerHTML);
}
function showDegreeCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#today-temperature");
  temperature.innerHTML = convertFtoC(temperature.innerHTML);
}

let degreeCelsius = document.querySelector("#сelsius");
let degreeFahrenheit = document.querySelector("#fahrenheit");

degreeCelsius.addEventListener("click", showDegreeCelsius);
degreeFahrenheit.addEventListener("click", showDegreeFahrenheit);

function showWeather(response) {
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#today-temperature");
  temperature.innerHTML = temp;
  let tempMax = Math.round(response.data.main.temp_max);
  let high = document.querySelector("#temp-max");
  high.innerHTML = tempMax;
  let tempMin = Math.round(response.data.main.temp_min);
  let low = document.querySelector("#temp-min");
  low.innerHTML = tempMin;
  let hum = response.data.main.humidity;
  let humidity = document.querySelector("#hum");
  humidity.innerHTML = `${hum}%`;
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${windSpeed} km/h`;
  let mainWeather = response.data.weather[0].main;
  let sky = document.querySelector("#sky");
  sky.innerHTML = mainWeather;
}

function search(city) {
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(currentUrl).then(showWeather);
}

function userCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city").value;
  search(inputCity);
}

function urlGeo(position) {
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(currentUrl).then(showWeather);
}

function requestGeo(event) {
  navigator.geolocation.getCurrentPosition(urlGeo);
}

let formSearch = document.querySelector(".form-search");
formSearch.addEventListener("submit", userCity);
let buttonCurrent = document.querySelector("#current");
buttonCurrent.addEventListener("click", requestGeo);

search("Kyiv");
