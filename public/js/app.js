// jshint ignore:start
'use strict'
const fetchWeather = '/weather'

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherIcon = document.querySelector('weatherIcon i')
const weatherCondition = document.querySelector('.weatherCondition')
const temperature = document.querySelector('.temperature span')
const locationElement = document.querySelector('.place')

const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']
const dateElement = document.querySelector('.date')
dateElement.textContent = new Date().getDate()+',' + monthNames[new Date().getMonth()].substring(0,3)
weatherForm.addEventListener('submit',(e)=>{ 
    e.preventDefault()
    locationElement.textContent = 'Loading...'
    temperature.textContent = ''
    weatherCondition.textContent=''
    const locationApi = `${fetchWeather}?address=${search.value}`
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if (data.error) {
                locationElement.textContent = data.error
                temperature.textContent = ''
                weatherCondition.textContent = ''
            } else {
                if (data.description === 'rain' || data.description === 'fog') {
                    weatherIcon.className = 'wi wi-day-'+data.description
                }
                locationElement.textContent = data.location
                temperature.textContent = Math.floor(data.temperature-273.5)+String.fromCharCode(176)+'c'
                weatherCondition.textContent = data.description.toUpperCase()
            }
            console.log(data)
    })
    })
})
/* 2BIT */