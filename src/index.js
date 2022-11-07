function convertCtoF(celsius) {
  let fahrn = (celsius * 9) / 5 + 32;
  fahrn = Math.round(fahrn);
  return fahrn;
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
  "Tuesday",
  "Wednesday",
  "Thurthday",
  "Friday",
  "Saturday",
];
let shortWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

function formatDate(timestamp) {
  let date = new Date(timestamp);
  return shortWeek[date.getDay()];
}

function showDegreeFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#today-temperature");
  temperature.innerHTML = convertCtoF(celsiusTemperature);
  let fahrinheitUnit = document.querySelector("#fahrenheit");
  fahrinheitUnit.classList.add("active");
  let celsiusUnit = document.querySelector("#сelsius");
  celsiusUnit.classList.remove("active");
  let feelings = document.querySelector("#feels-like");
  feelings.innerHTML = `${convertCtoF(feelingTemperature)}℉`;

  let tempFirst = document.querySelector("#temp-first");
  let tempSecond = document.querySelector("#temp-second");
  let tempThird = document.querySelector("#temp-third");
  let tempFourth = document.querySelector("#temp-fourth");
  let tempFifth = document.querySelector("#temp-fifth");

  tempFirst.innerHTML = `${convertCtoF(celsiusTemperatureFirst)}℉`;
  tempSecond.innerHTML = `${convertCtoF(celsiusTemperatureSecond)}℉`;
  tempThird.innerHTML = `${convertCtoF(celsiusTemperatureThird)}℉`;
  tempFourth.innerHTML = `${convertCtoF(celsiusTemperatureFourth)}℉`;
  tempFifth.innerHTML = `${convertCtoF(celsiusTemperatureFifth)}℉`;
}
function showDegreeCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#today-temperature");
  temperature.innerHTML = celsiusTemperature;
  let celsiusUnit = document.querySelector("#сelsius");
  celsiusUnit.classList.add("active");
  let fahrinheitUnit = document.querySelector("#fahrenheit");
  fahrinheitUnit.classList.remove("active");
  let feelings = document.querySelector("#feels-like");
  feelings.innerHTML = `${feelingTemperature}℃`;

  let tempFirst = document.querySelector("#temp-first");
  let tempSecond = document.querySelector("#temp-second");
  let tempThird = document.querySelector("#temp-third");
  let tempFourth = document.querySelector("#temp-fourth");
  let tempFifth = document.querySelector("#temp-fifth");

  tempFirst.innerHTML = `${celsiusTemperatureFirst}℃`;
  tempSecond.innerHTML = `${celsiusTemperatureSecond}℃`;
  tempThird.innerHTML = `${celsiusTemperatureThird}℃`;
  tempFourth.innerHTML = `${celsiusTemperatureFourth}℃`;
  tempFifth.innerHTML = `${celsiusTemperatureFifth}℃`;
}

function showWeather(response) {
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.city;
  celsiusTemperature = Math.round(response.data.temperature.current);

  let temperature = document.querySelector("#today-temperature");
  temperature.innerHTML = celsiusTemperature;

  let feelsLike = document.querySelector("#feels-like");
  feelingTemperature = Math.round(response.data.temperature.feels_like);
  feelsLike.innerHTML = `${feelingTemperature}℃`;

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = `${response.data.temperature.pressure} hPa`;

  let hum = response.data.temperature.humidity;
  let humidity = document.querySelector("#hum");
  humidity.innerHTML = `${hum}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${windSpeed} km/h`;

  let mainWeather = response.data.condition.description;
  let sky = document.querySelector("#sky");
  sky.innerHTML = mainWeather;

  let ico = document.querySelector("#ico");
  let icoUrl = response.data.condition.icon_url;
  ico.setAttribute("src", icoUrl);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row forcast-line g-1">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div>${formatDate(forecastDay.time * 1000)}</div>
        <img src="${forecastDay.condition.icon_url}" alt="" width="60" />
        <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temperature.maximum
        )}º</span>
        <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temperature.minimum
        )}º</span>
      </div>
    </div>
    `;
    }
  });
  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

function showForecast(response) {
  let firstdayIco = document.querySelector("#first-day");
  let seconddayIco = document.querySelector("#second-day");
  let thirddayIco = document.querySelector("#third-day");
  let fourthIco = document.querySelector("#fourth-day");
  let fifthdayIco = document.querySelector("#fifth-day");
  firstdayIco.setAttribute("src", response.data.daily[0].condition.icon_url);
  seconddayIco.setAttribute("src", response.data.daily[1].condition.icon_url);
  thirddayIco.setAttribute("src", response.data.daily[2].condition.icon_url);
  fourthIco.setAttribute("src", response.data.daily[3].condition.icon_url);
  fifthdayIco.setAttribute("src", response.data.daily[4].condition.icon_url);

  let tempFirst = document.querySelector("#temp-first");
  let tempSecond = document.querySelector("#temp-second");
  let tempThird = document.querySelector("#temp-third");
  let tempFourth = document.querySelector("#temp-fourth");
  let tempFifth = document.querySelector("#temp-fifth");
  celsiusTemperatureFirst = Math.round(response.data.daily[0].temperature.day);
  celsiusTemperatureSecond = Math.round(response.data.daily[1].temperature.day);
  celsiusTemperatureThird = Math.round(response.data.daily[2].temperature.day);
  celsiusTemperatureFourth = Math.round(response.data.daily[3].temperature.day);
  celsiusTemperatureFifth = Math.round(response.data.daily[4].temperature.day);

  tempFirst.innerHTML = `${celsiusTemperatureFirst}℃`;
  tempSecond.innerHTML = `${celsiusTemperatureSecond}℃`;
  tempThird.innerHTML = `${celsiusTemperatureThird}℃`;
  tempFourth.innerHTML = `${celsiusTemperatureFourth}℃`;
  tempFifth.innerHTML = `${celsiusTemperatureFifth}℃`;

  let dateFirst = document.querySelector("#first-date");
  let dateSecond = document.querySelector("#second-date");
  let dateThird = document.querySelector("#third-date");
  let dateFourth = document.querySelector("#fourth-date");
  let dateFifth = document.querySelector("#fifth-date");
  dateFirst.innerHTML = formatDate(response.data.daily[0].time * 1000);
  dateSecond.innerHTML = formatDate(response.data.daily[1].time * 1000);
  dateThird.innerHTML = formatDate(response.data.daily[2].time * 1000);
  dateFourth.innerHTML = formatDate(response.data.daily[3].time * 1000);
  dateFifth.innerHTML = formatDate(response.data.daily[4].time * 1000);
}

function search(city) {
  let apiKey = "3te112f50837749e5bfeo6adf636e68f";
  let currentUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let forecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(currentUrl).then(showWeather);
  axios.get(forecast).then(displayForecast);
}

function userCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city").value;
  search(inputCity);
}

function urlGeo(position) {
  let apiKey = "3te112f50837749e5bfeo6adf636e68f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let currentUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  let forecast = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(currentUrl).then(showWeather);
  axios.get(forecast).then(displayForecast);
}

function requestGeo(event) {
  navigator.geolocation.getCurrentPosition(urlGeo);
  let inputCity = document.querySelector("#input-city");
  inputCity.value = null;
}

let celsiusTemperature = null;
let feelingTemperature = null;
let celsiusTemperatureFirst = null;
let celsiusTemperatureSecond = null;
let celsiusTemperatureThird = null;
let celsiusTemperatureFourth = null;
let celsiusTemperatureFifth = null;

let degreeCelsius = document.querySelector("#сelsius");
let degreeFahrenheit = document.querySelector("#fahrenheit");

degreeCelsius.addEventListener("click", showDegreeCelsius);
degreeFahrenheit.addEventListener("click", showDegreeFahrenheit);

let formSearch = document.querySelector(".form-search");
formSearch.addEventListener("submit", userCity);
let buttonCurrent = document.querySelector("#current");
buttonCurrent.addEventListener("click", requestGeo);

search("Kyiv");
