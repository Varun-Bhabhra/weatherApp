// Presonal API key and API URL from OpenWeatherMap
let apiKey = '32363641d307b29e83a5321ec18c1249'
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='
let finalApiKey = `&appid=${apiKey}`;
let cityNameValue = "kolkata";

// Constant Selectors
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
const inputName = document.querySelector("#name")
const generateButton = document.querySelector('button');
const mainTemp = document.querySelector('.mainTemp');
const others = document.querySelector('.others');
const minTemp = document.querySelector('.minTemp');
const maxTemp = document.querySelector('.maxTemp');
const humidity = document.querySelector('.humidity');

// Variable Decleration
let d = new Date();
let date = `${d.getDate()} ${monthNames[d.getMonth()]},${d.getFullYear()}`;
// Appending Date
let fixedDate = document.createElement('H1');
fixedDate.setAttribute('class', 'date')
fixedDate.append(date)
mainTemp.append(fixedDate);

// Creating Elements to append
let cityName = document.createElement('H1');
cityName.setAttribute('class', 'cityName');

let temp = document.createElement('H1');
temp.setAttribute('class', 'mainTemperature');

let tempIcon = document.createElement('SPAN');
tempIcon.setAttribute('class', 'tempIcon');

let currentClimate = document.createElement('SPAN');
currentClimate.setAttribute('class', 'currentClimate');

const dummyCode = document.createElement('P');
dummyCode.setAttribute('class', 'dummyCode');

// Events and Function Calls
inputName.addEventListener('change', () => cityNameValue = inputName.value)

const getWeather = async () => {
    let finalURL = baseURL + cityNameValue + finalApiKey
    const response = await fetch(finalURL);
    try {
        const allData = await response.json()
        const temperature = Number(allData.main.temp);
        const { name, coord, main, sys, weather } = allData;
        const { lon, lat } = coord;
        const { temp_min, temp_max, humidity } = main;
        const { country } = sys;

        console.log(`Name - ${name}\nLongitude - ${lon}\nLatitude - ${lat}\nMax-Temperature - ${temp_max}\nMin-Temperature - ${temp_min}\nHumidity - ${humidity}\nWeather - ${weather[0].main}\nCountry - ${country}`);

        // Appending City Name
        let city = mainTemp.appendChild(cityName)
        city.innerText = `${name}, ${country}`;

        // Appending Main Temperature
        mainTemp.appendChild(temp).innerText = Math.trunc(temperature - 272.15) + '°';
        // Appending Icon
        if (weather[0].main === 'Haze') {
            tempIcon.innerHTML = '<i class="fas fa-smog"></i>';
            temp.appendChild(tempIcon)
        } else if (weather[0].main === 'Clouds') {
            tempIcon.innerHTML = '<i class="fas fa-cloud-sun"></i>';
            temp.appendChild(tempIcon)
        } else if (weather[0].main === 'Clear') {
            tempIcon.innerHTML = '<i class="fas fa-sun"></i>';
            temp.appendChild(tempIcon)
        } else if (weather[0].main === 'Rain') {
            tempIcon.innerHTML = '<i class="fas fa-cloud-showers-heavy"></i>';
            temp.appendChild(tempIcon)
        } else {
            tempIcon.innerHTML = '<i class="fas fa-history"></i>';
            temp.appendChild(tempIcon)
        }

        // Appending Current Climate
        let current_climate = mainTemp.appendChild(currentClimate);
        current_climate.innerText = `Mostly ${weather[0].main}`;

        // Appending dummy code
        if (weather[0].main === 'Haze') {
            let dummy = mainTemp.appendChild(dummyCode);
            dummy.innerText = '17% chance to rain later'
        } else if (weather[0].main === 'Clouds') {
            let dummy = mainTemp.appendChild(dummyCode);
            dummy.innerText = '79% chance to rain later'
        } else if (weather[0].main === 'Clear') {
            let dummy = mainTemp.appendChild(dummyCode);
            dummy.innerText = '6% chance to rain later'
        } else {
            let dummy = mainTemp.appendChild(dummyCode);
            dummy.innerText = '2% chance to rain later'
        }

        // Items for the other-half


    } catch (err) {
        console.log('error', err)
    }
}
generateButton.addEventListener("click", getWeather);