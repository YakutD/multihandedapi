const axios = require('axios');
const url = 'https://restcountries.eu/rest/v2/alpha/';



let country = (code)=>{

    return axios.get(`${url+encodeURIComponent(code)}`)
    .then(resp => { 
      if(resp.data.name){
        return createCountryData(resp.data);
      }else return (new Error(resp.data.message));
    })
    .catch(err => {
        return (new Error(err.message));
    });
}

function createCountryData(data){
    let regionalBlocs = [];
    let languages = [];
    for(let i = 0; i < data.regionalBlocs.length;i++){
        let obj = {
            acronym: data.regionalBlocs[i].acronym,
            name: data.regionalBlocs[i].name
        }
        regionalBlocs.push(obj);
    }
    for(let k = 0; k < data.languages.length;k++){
        let obj = {
            name: data.languages[k].name,
            nativeName: data.languages[k].nativeName
        }
        languages.push(obj);
    }
    let country = {
        name: data.name,
        topLevelDomain: data.topLevelDomain,
        callingCodes: data.callingCodes,
        capital: data.capital,
        altSpellings: data.altSpellings,
        region: data.subregion,
        population: data.population,
        demonym: data.demonym,
        area: data.area,
        timezones: data.timezones,
        borders: data.borders,
        nativeName: data.nativeName,
        numericCode: data.numericCode,
        currencies: data.currencies,
        flag: data.flag,
        regionalBlocs: regionalBlocs,
        languages: languages
    };
    //console.log(currencies);
    return country;
}



module.exports = country;