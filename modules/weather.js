const axios = require('axios');
const url = 'http://api.openweathermap.org/data/2.5/weather?';



let weather = (key,city,mod = 'K',lang='en')=>{
    mod = mod.toUpperCase();
    let units = null;
    if(mod == 'C') units = 'metric';
    else if(mod == 'F') units = 'imperial';

    return axios.get(`${url}appid=${encodeURIComponent(key)}&q=${encodeURIComponent(city)}&units=${units}&lang=${encodeURIComponent(lang)}`)
    .then(resp => { 
      if(resp.data.cod == 200){
        //console.log(resp.data);
        return createWeatherData(resp.data,mod);
      }
      else return (new Error(resp.data.message));
    })
    .catch(err => {
        return (new Error(err.message));
    });
}

function createWeatherData(data,mod){
    //Celsius or Farengate?
    let units = 'Kelvin';

    if(mod == 'C') units = 'Celsius';
    else if(mod == 'F') units = 'Fahrenheit';

    // let snow = 0,
    //     rain = 0;
        
    // if(data.snow) snow = data.snow["1h"];
    // if(data.rain) rain = data.rain["1h"];
    


    let weather = {
        city: data.name,
        mod: units,
        main: data.weather[0].main,
        description: data.weather[0].description,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        wind_speed: data.wind.speed,
        pressure:data.main.pressure,
        humidity:data.main.humidity,
        clouds: data.clouds.all,
        country: data.sys.country,
    };
    return weather;
}



module.exports = weather;