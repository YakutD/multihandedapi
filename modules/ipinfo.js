const axios = require('axios');
const url = 'http://ip-api.com/json/';



let ipinfo = (ip)=>{

    return axios.get(`${url+encodeURIComponent(ip)}`)
    .then(resp => { 
      if(resp.data.status == "success"){
        
        return createWeatherData(resp.data);
      }
      else return (new Error(resp.data.message));
    })
    .catch(err => {
        return (new Error(err.message));
    });
}

function createWeatherData(data){
    let ipinfo = {
        ip: data.query,
        country: data.country,
        countryCode: data.countryCode,
        region: data.region,
        regionName: data.regionName,
        city: data.city,
        zip: data.zip,
        lat: data.lat,
        lon: data.lon,
        timezone:data.timezone,
        isp:data.isp, // Internet Service Provider
        org: data.org,
    };
    return ipinfo;
}



module.exports = ipinfo;