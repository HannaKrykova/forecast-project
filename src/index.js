function weatherInfoUpdate(response) {
  let temperature = document.querySelector("#forecast-temprature-tempvalue");
  let city = document.querySelector("#current-city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  city.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(response.data.temperature.current);
  weatherDescription.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  time.innerHTML = formatDate(date);
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" id="forecast-temprature-emoji">`;
  getForecast(response.data.city);
}

function citySearch(city) {
  let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(weatherInfoUpdate);
}

function citySubmit(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#searched-city");
  citySearch(searchedCity.value);
}

let citySearchForm = document.querySelector("#search-form");
citySearchForm.addEventListener("submit", citySubmit);

document.addEventListener("DOMContentLoaded", function () {
  const defaultCity = "Beirut";
  citySearch(defaultCity);
});

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios(apiUrl).then(dispayDailyForecast);
}

function dispayDailyForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="daily-forecast-day">
            <div class="daily-forecast-day-of-the-week">${formatDay(
              day.time
            )}</div>
            <div class="daily-forecast-icon"><img src="${
              day.condition.icon_url
            }"/></div>
          <div class="daily-forecast-temperature">
            <div class="daily-forecast-temperature-max">${Math.round(
              day.temperature.maximum
            )}°</div>
            <div class="daily-forecast-temperature-min">${Math.round(
              day.temperature.minimum
            )}°</div>
          </div>
        </div>`;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}
dispayDailyForecast();
