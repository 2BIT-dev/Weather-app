// jshint ignore:start
'use strict'
const request = require('request')
const constants = require('../config')
const { json } = require('body-parser')

const weatherData = (address, callback) => {
    const url = constants.openWeatherMap.base_url + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.secret_key
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Can\'t fetch weather information from open weather api',undefined)
        } else if (!body.name||!body.main.temp||!body.weather||!body.name) {
            callback('Unable to find the required data, try another location',undefined)
        }
         else {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                location:body.name
            })
        }
    })
}
module.exports = weatherData
/* 2BIT */