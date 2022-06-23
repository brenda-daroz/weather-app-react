import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherIcon from './WeatherIcon';


function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [icon, setIcon] = useState(null)
  const [status, setStatus] = useState(null)
  const [temp, setTemp] = useState(null)
  const [feels, setFeels] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [speed, setSpeed] = useState(null)
  const [lat, setLatitude] = useState(() => console.log("ola"))
  const [lon, setLongitude] = useState(() => console.log("ola"))
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=1773caa99e424b652cf227671991b8a2`

  function handleWeather(response) {
    setData(response.data)
    // console.log(response.data)
    setIcon(response.data.weather[0].icon);
    setStatus(response.data.weather[0].main);
    setTemp(Math.round(response.data.main.temp))
    setFeels(Math.round(response.data.main.feels_like))
    setHumidity(response.data.main.humidity)
    setSpeed(Math.round(response.data.wind.speed))
    // setLongitude(response.data.coord.lon)
    // setLatitude(response.data.coord.lat)
  }


  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then(handleWeather)
      setLocation('')
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);


  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=1773caa99e424b652cf227671991b8a2`).then
      (handleWeather)
  }, [lat, lon])


  return (
    <div className="App">
      <div className="search">
        <input
          value={location}

          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter location"
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
            {/* <p>{lat}</p>
            <p>{lon}</p> */}
          </div>
          <div className="temp">
            {temp ? <h1>{temp} ºC</h1> : null}
            <div className='description-wrapper'>
              {icon ? <WeatherIcon value={icon} /> : null}
              <div className="description">{status}</div>
            </div>
          </div>

        </div>
        <div className="bottom">
          <div className="feels">
            {feels ? <p>{feels} ºC</p> : null}
            <p className="info">Feels like</p>
          </div>
          <div className="humidity">
            {humidity ? <p>{humidity}%</p> : null}
            <p className="info">Humidity</p>
          </div>
          <div className="wind">
            {speed ? <p>{speed}km/h</p> : null}
            <p className="info">Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
