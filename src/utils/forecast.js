const request = require('request');

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=5ae21ba5d2a4ce8ef9ea94f4ce34fd72&query='+ latitude+','+longitude

    request({url, json: true},(error, {body})=>{
        if(error){
           callback('Unable to connect to weather services');
        }
        else if(body.error){
           callback('Unable to find location');
        }
        else{
           callback(undefined, 
            `Weather type : ${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}\u2103, but it feels like ${body.current.feelslike}\u2103 with ${body.current.precip}% chances of rainfall`

        
           ) 
        } 
        })
}
module.exports =  forecast;