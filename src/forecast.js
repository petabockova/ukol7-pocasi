import getWeatherIcon from './weather-icons';

const apiKey = "53ad1f35b15c318502ad84c9a6c0fe5c";
const newApiUrl = "https://api.openweathermap.org/data/2.5/forecast";

export default class Forecast {
    constructor() {

    }

    getForecast() {
        let query = fetch(`${newApiUrl}?APPID=${apiKey}&q=Brno&units=metric&lang=cz`);

        query
            .then(response => response.json())
            .then(data => this.displayForecast(data))
            .catch((error) => {
                console.log(error);
            }
            )
    }

    displayForecast(data) {
        let html = "";
        let forecast = document.querySelector("#predpoved")
        let firstDay = data.list[8];
        let secondDay = data.list[16];
        let thirdDay = data.list[24];
        let forthDay = data.list[32]
        let forecastList = [firstDay, secondDay, thirdDay, forthDay];

        function getNormalDate(unixTimestampValue) {
            let date = new Date(unixTimestampValue * 1000);
            let week = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"]
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let dayWeek = week[date.getDay()];

            return `${dayWeek} ${day}. ${month}.`;
        }

        forecastList.forEach(foreCast => {
            html += `<div class="forecast">
        <div class="forecast__day">${getNormalDate(foreCast.dt)}</div>
        <div class="forecast__icon">
            ${getWeatherIcon(foreCast.weather[0].id, foreCast.weather[0].icon)}
        </div>
        <div class="forecast__temp">${Math.round(foreCast.main.temp)} °C</div>
      </div>`;
        })
        forecast.innerHTML = html;
    }
}