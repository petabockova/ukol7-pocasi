import getWeatherIcon from './weather-icons';

const apiKey = "53ad1f35b15c318502ad84c9a6c0fe5c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

export default class Weather {
    constructor() {

    }

    getWeather() {
        let query = fetch(`${apiUrl}?APPID=${apiKey}&q=Brno&units=metric&lang=cz`);
        query
            .then(response => response.json())
            .then(data => this.displayWeather(data))
            .catch((error) => {
                console.log(error);
            }
            )
    }

    displayWeather(data) {
        const cityEl = document.querySelector("#mesto");
        const tempEl = document.querySelector("#teplota");
        const descEl = document.querySelector("#popis");
        const iconEl = document.querySelector("#ikona");
        const humEl = document.querySelector("#vlhkost");
        const windEl = document.querySelector("#vitr");
        const sunriseEl = document.querySelector("#vychod");
        const sunsetEl = document.querySelector("#zapad");
    
        function getNormalTime(unixTimestampValue) {
            let date = new Date(unixTimestampValue * 1000);
            let hours = date.getHours();
            let mins = date.getMinutes();
            if (mins < 10) {
                mins = '0' + mins;
            }
            return `${hours}:${mins}`;
        }
    
        cityEl.textContent = data.name;
        tempEl.textContent = Math.round(data.main.temp);
        descEl.textContent = data.weather[0].description;
    
        let newIcon = getWeatherIcon(data.weather[0].id, data.weather[0].icon);
        iconEl.innerHTML = newIcon;
    
        humEl.textContent = data.main.humidity;
        windEl.textContent = Number.parseFloat(data.wind.speed).toFixed(1);
        sunriseEl.textContent = getNormalTime(data.sys.sunrise);
        sunsetEl.textContent = getNormalTime(data.sys.sunset);
    }
}