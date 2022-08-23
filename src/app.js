const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const request = require('request');


const express = require('express');
const hbs = require('hbs');

const app = express();

const port = process.env.PORT || 3000
// define paths for express configuration
const publicdirpath = path.join(__dirname, '../public');
const viewpath = path.join(__dirname,'../template/views') 
const partialsPath = path.join(__dirname, '../template/partials') 

//setup handlebars enginr and view location
app.set('view engine', 'hbs')
app.set('views', viewpath)

hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicdirpath));



app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name:'Ritam'
    })
})

app.get('/about', (req, res)=>{
res.render('about', {
title: 'ABOUT',
name:'Ritam'
})
})


app.get('/help', (req, res)=>{
res.render('help', {
title: 'HELP',
msg: 'We are here for help',
name: 'Ritam Mandal'

})
})






app.get('/weather', (req, res)=>{
    if(!req.query.address){
        res.send({
            error: 'Please enter address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error, forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })

// res.send({
//     forecast: 'it is snowing',
//     location: 'Philadelphia',
//     address: req.query.address
// })
});

app.get('/products', (req, res)=>{

    if(!req.query.search){
        res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
return res.send({
    products: []
})
});

app.get('/help/*',(req, res)=>{
res.render('error',{
    errormessage: '404 help article not found'
})
})

app.get('*',(req,res)=>{
    res.render('error',{
        errormessage: '404 Page not found'
    })
})



app.listen(port,()=>{
    console.log('Server is up in port '+port)
});