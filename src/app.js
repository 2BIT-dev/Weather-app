// jshint ignore:start
'use strict'
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const weatherData = require('../utils/weatherData')
const port = process.env.PORT || 3000
//express config
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
app.use(express.static(path.join(__dirname, '../public')))
//routes
app.get('', (req, res) => {
    res.render('index',{
        title:'Weather App'
    })
})
app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error:'Please provide an address'
        })
    }
    weatherData(address, (error, { temperature, description, location }={}) => {
        if (error) {
            return res.send({
              error
          })
        }
        console.log(temperature, description, location)
        res.send({
            temperature,
            description,
            location
        })
    })
})
app.get('*', (req, res) => {
    res.render('404',{
        title: 'Page not found'
    })
})
app.listen(port, () => {
    console.log(`Server is up at port ${port}`)
})
/* 2BIT */