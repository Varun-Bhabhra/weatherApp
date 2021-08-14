// Presonal API key and API URL from OpenWeatherMap
let apiKey = '32363641d307b29e83a5321ec18c1249'
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='
let finalApiKey = `&appid=${apiKey}`;
let cityNameValue = "mumbai";

// Constant Selectors
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const inputName = document.querySelector("#name")
const generateButton = document.querySelector('button');
const mainTemp = document.querySelector('.mainTemp');
const others = document.querySelector('.others')
const minTemp = document.querySelector('.minTemp')
const maxTemp = document.querySelector('.maxTemp')
const humidity = document.querySelector('.humidity')

// Variable Decleration
let d = new Date();
let date = `${d.getDate()} ${monthNames[d.getMonth()]},${d.getFullYear()}`;

let temp = document.createElement('H1');
temp.setAttribute('class', 'mainTemperature');

let cityName = document.createElement('H1');
cityName.setAttribute('class', 'cityName');

let countryName = document.createElement('H1');
countryName.setAttribute('class', 'countryName');

// Events and Function Calls
inputName.addEventListener('change', function () {
    // cityNameValue = inputName.value
})
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
        let countri = mainTemp.appendChild(countryName);
        city.innerText = name;
        countri.innerText = country;

        // Appending Date
        mainTemp.append(date);

        // Appending Main Temperature
        mainTemp.appendChild(temp).innerText = Math.trunc(temperature - 272.15) + ' C°';
    } catch (err) {
        console.log('error', err)
    }
}
generateButton.addEventListener("click", getWeather);