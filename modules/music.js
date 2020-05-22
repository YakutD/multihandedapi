const axios = require('axios');
const url = 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&format=json';



let music = (key,limit = 50)=>{

    return axios.get(`${url}&api_key=${encodeURIComponent(key)}&limit=${limit}`)
    .then(resp => { 
      if(resp.data.error){
        return (new Error(resp.data.message));
      }
      else return createMusicData(resp.data);
    })
    .catch(err => {
        return (new Error(err.message));
    });
}

function createMusicData(data){
    let music = [];
    data = data.tracks.track;
    for(let i = 0; i < data.length; i++){
        let obj = {
            track: data[i].name,
            artist: data[i].artist.name,
            listeners: data[i].listeners,
            playcount: data[i].playcount 
        }
        music.push(obj);
    }
    return {tracks: music};
}



module.exports = music;