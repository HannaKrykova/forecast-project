function citySearch(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  let searchedCity = document.querySelector("#searched-city");
  currentCity.innerHTML = searchedCity.value;
}

let citySearchForm = document.querySelector("#search-form");
citySearchForm.addEventListener("submit", citySearch);
