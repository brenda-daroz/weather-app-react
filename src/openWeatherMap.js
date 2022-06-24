import axios from "axios"


const API_KEY = "1773caa99e424b652cf227671991b8a2"
const API_HOST = "api.openweathermap.org"

function requestByCoordinates(lat, lon) {
    return axios.get(`https://${API_HOST}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
  }

function requestByLocation(location) {
    return axios.get(`https://${API_HOST}/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`)
}

export {requestByCoordinates, requestByLocation}