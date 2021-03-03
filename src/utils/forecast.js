const request = require('request');

const forecast =( lat, long , callback) =>{
    const url = "http://api.openweathermap.org/data/2.5/weather?lat=" +lat +"&lon=" + long + "&appid=698ef8d1f95f0f8b5bdbf7484f52279d"

    request({url, json:true}, (error,{body})=>{
        if(error){
            callback("Unable to connect to weather services", undefined);
        }else if(body.message){
            callback("unable to find the location.", undefined)
        }
        else{
            
            callback(undefined, {
                minTemp :body.main.temp_min

            })
        } 
    })
}

module.exports = forecast;