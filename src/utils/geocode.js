const request = require('request');


const geocode = (address, callback)=>{
    const url = 'http://api.positionstack.com/v1/forward?access_key=ff8ef13c1f1bd9ec621118b60763fcd9&query='+encodeURIComponent(address)+'&limit=1'
    
    request({url, json: true},(error, {body})=>{
    if(error){
       callback('Unable to connect to location services');
    }
    else if(body.error){
       callback('Unable to find location');
    }
    else{
       callback(undefined, {
          latitude: body.data[0].latitude,
          longitude: body.data[0].longitude,
          location: body.data[0].name
    
       })
    } 
    })
    
    
    }
    
    


    module.exports = geocode 