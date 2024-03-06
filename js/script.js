let weather
let weatherData
let weatherSearch
let inputSearch = document.querySelector('.search-input');
let buttonSearch = document.querySelector('.search-button');

let today = document.querySelector('.day');
let todayMonth = document.querySelector('.month');
let todayCity = document.querySelector('.city');
let todayDegree = document.querySelector('.today .degree');
let todayDegreeImg = document.querySelector('.today .degree-img');
let todayDegreeText = document.querySelector('.today .weather');
let todayRain = document.querySelector('.weather-icon.rain span');
let todayWind = document.querySelector('.weather-icon.wind span');
let todayCompass = document.querySelector('.weather-icon.compass span');

let tomorrowDay = document.querySelector('.day-tomorrow');
let tomorrowDegreeImg = document.querySelector('.tomorrow .degree-img');
let tomorrowDegree = document.querySelector('.tomorrow .degree');
let tomorrowMinDegree = document.querySelector('.tomorrow .min-degree');
let tomorrowDegreeText = document.querySelector('.tomorrow .weather');

let afterTomorrowDay = document.querySelector('.day-after-tomorrow');
let afterTomorrowDegreeImg = document.querySelector('.after-tomorrow .degree-img');
let afterTomorrowDegree = document.querySelector('.after-tomorrow .degree');
let afterTomorrowMinDegree = document.querySelector('.after-tomorrow .min-degree');
let afterTomorrowDegreeText = document.querySelector('.after-tomorrow .weather');

function weatherPrediction(loc = "Cairo") {
  (async function () {
    weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0522039ae6c04142989161322222110&q=${loc}&days=3`);
    weatherData = await weather.json()
    console.log(weatherData);
    setTodayData();
    setTomorrowData();
    setAfterTomorrowData();
  })();
};

function setTodayData() {
  let dateToday = new Date(weatherData.forecast.forecastday[0].date);
  let longMonth = dateToday.toLocaleString('en-us', { month: 'long' });
  let shortDay = dateToday.toLocaleString('en-us', { day: 'numeric' });
  let longDay = dateToday.toLocaleString('en-us', { weekday: 'long' });
  todayMonth.innerHTML = shortDay + ' ' + longMonth
  today.innerHTML = longDay
  todayCity.innerHTML = weatherData.location.name
  todayDegree.innerHTML = weatherData.current.temp_c + "<sup>o</sup>C"
  todayDegreeImg.setAttribute("src", "http:" + weatherData.current.condition.icon);
  todayDegreeText.innerHTML = weatherData.current.condition.text
  todayRain.innerHTML = weatherData.forecast.forecastday[0].day.daily_chance_of_rain + "%"
  todayWind.innerHTML = weatherData.current.wind_mph + "m/h"
  todayCompass.innerHTML = weatherData.current.wind_dir;
};

function setTomorrowData() {
  let dateTomorrow = new Date(weatherData.forecast.forecastday[1].date);
  let longTomorrow = dateTomorrow.toLocaleString('en-us', { weekday: 'long' });
  tomorrowDay.innerHTML = longTomorrow
  tomorrowDegreeImg.setAttribute("src", "http:" + weatherData.forecast.forecastday[1].day.condition.icon);
  tomorrowDegree.innerHTML = weatherData.forecast.forecastday[1].day.maxtemp_c + "<sup>o</sup>C"
  tomorrowMinDegree.innerHTML = weatherData.forecast.forecastday[1].day.mintemp_c + "<sup>o</sup>C"
  tomorrowDegreeText.innerHTML = weatherData.forecast.forecastday[1].day.condition.text
};

function setAfterTomorrowData() {
  let dateAfterTomorrow = new Date(weatherData.forecast.forecastday[2].date);
  let longAfterTomorrow = dateAfterTomorrow.toLocaleString('en-us', { weekday: 'long' });
  afterTomorrowDay.innerHTML = longAfterTomorrow
  afterTomorrowDegreeImg.setAttribute("src", "http:" + weatherData.forecast.forecastday[2].day.condition.icon);
  afterTomorrowDegree.innerHTML = weatherData.forecast.forecastday[2].day.maxtemp_c + "<sup>o</sup>C"
  afterTomorrowMinDegree.innerHTML = weatherData.forecast.forecastday[2].day.mintemp_c + "<sup>o</sup>C"
  afterTomorrowDegreeText.innerHTML = weatherData.forecast.forecastday[2].day.condition.text
};

weatherPrediction();

inputSearch.addEventListener("input", async function () {
  let weatherInput = this.value
  await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0522039ae6c04142989161322222110&q=${this.value}&days=3`).then((response) => {
    if (response.status = 200) {
      weatherPrediction(weatherInput);
    }
  });
});
