function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let prediction = response.data.daily;

  let forecastElement = document.querySelector("#forecast-day");

  let forecastHTML = `<div class="row">`;
  prediction.forEach(function (predictionDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="weather-forecast-day">${formatDay(
                  predictionDay.dt
                )}</div>
                <img
                  src="https://openweathermap.org/img/wn/${
                    predictionDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="38"
                />
                <div class="weather-forecast-temps">
                  <span class="weather-forecast-temp-max">${Math.round(
                    predictionDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-temp-min">${Math.round(
                    predictionDay.temp.min
                  )}°</span>
                </div>
              </div>
            
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function acquireForecast(coordinates) {
  let apiKey = "c03face7caa58a9b7ffa9f52b7238a93";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windspeed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weather-icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  acquireForecast(response.data.coord);
}

function search(city) {
  let apiKey = "2e45eaecbf0d17607244af8d840a698f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handlePush(event) {
  event.preventDefault();
  let cityResponseElement = document.querySelector("#city-response");
  search(cityResponseElement.value);
  console.log(cityResponseElement.value);
}

search("Lagos");

let form = document.querySelector("#searching");
form.addEventListener("submit", handlePush);
