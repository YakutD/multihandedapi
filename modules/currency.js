const axios = require('axios');
const url = 'https://min-api.cryptocompare.com/data/price?';


let crypto = (key,symbols,base)=>{
    if(symbols.length < 1) return new Error("Must include at least one symbol");
    else return axios.get(`${url}api_key=${encodeURIComponent(key)}&fsym=${encodeURIComponent(base)}&tsyms=${encodeURIComponent(symbols.join(','))}`)
    .then(resp => { 
      if(resp.data["Response"]) return (new Error(resp.data["Response"]));
      else{
        return createCryptoData(resp.data,symbols,base);
      }
    })
    .catch(err => {
        return (new Error(err.message));
    });
}

function createCryptoData(data,symbols,base){
    let sample = [];
    
    for(let i = 0; i < symbols.length; i++){
        let s = symbols[i].toUpperCase();
        let obj = {
            title: s,
            value: data[s]
        };
        sample.push(obj);
    }

    let crypto = {
        base: base.toUpperCase(),
        symbols: sample
    };
    return crypto;
}



module.exports = crypto;