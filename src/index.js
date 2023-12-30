function weatherInfoUpdate(response) {
  let currentTemperature = document.querySelector(
    "#forecast-temprature-tempvalue"
  );
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.city;
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
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
