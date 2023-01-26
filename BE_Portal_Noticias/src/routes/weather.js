const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=cali&appid=0042240f966a384b384ba818545ecf3e&lang=es&units=metric')
        .then(response => response.json())
        .then(json => {
            let weather = {};
            weather.time = json.weather[0].description;
            weather.city = json.name;
            weather.country = json.sys.country;
            weather.temperature = json.main.temp;
            weather.humidity = json.main.humidity;
            res.send(weather);
        });
     
});

module.exports = router;