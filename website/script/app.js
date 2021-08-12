// Presonal API key and API URL from OpenWeatherMap
let apiKey = '32363641d307b29e83a5321ec18c1249'
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='
let finalApiKey = `&appid=${apiKey}`;
let cityNameValue = "";

// Variable Decleration
let inputName = document.querySelector("#name")
let generateButton = document.querySelector('button');
let tempText = document.querySelector('.main');

// Events and Functions
inputName.addEventListener('change', function () {
    cityNameValue = inputName.value
})

const getWeather = async () => {
    let finalURL = baseURL + cityNameValue + finalApiKey
    const response = await fetch(finalURL);
    try {
        const allData = await response.json()
        const temperature = Number(allData.main.temp);
        tempText.innerHTML = Math.trunc(temperature - 272.15) + ' C°';
        // console.log(temperature)
    } catch (err) {
        console.log('error', err)
    }
}

generateButton.addEventListener("click", getWeather);