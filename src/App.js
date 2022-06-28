import React, { useState, useEffect } from 'react';
import WeatherIcon from './components/WeatherIcon/weatherIcon';
import { Search } from './components/Search/search';
import { requestByCoordinates } from './openWeatherMap';
import ChangeImage from './unsplash';
// import { searchPhotos } from './unsplash';


function App() {
  const [weather, setWeather] = useState({
    data: {},
    icon: null,
    description: null,
    status: null,
    temp: null,
    feels: null,
    humidity: null,
    speed: null
  })

  const [{ lat, lon }, setCoordinates] = useState({ lat: null, long: null });

  function handleWeather(response) {
    setWeather({
      data: response.data,
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
      status: response.data.weather[0].main,
      temp: Math.round(response.data.main.temp),
      feels: Math.round(response.data.main.feels_like),
      humidity: response.data.main.humidity,
      speed: Math.round(response.data.wind.speed)
    })
  }

  useEffect(() => {
    const init = performance.now()
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoordinates({ lat: position.coords.latitude, lon: position.coords.longitude });
      const end = performance.now()
      console.log(`Call to doSomething took ${end - init} milliseconds`)
    })
  }, [])


  useEffect(() => {
    if (lat === null || lon === null) {
      return;
    } else {
      requestByCoordinates(lat, lon).then(handleWeather)
    }
  }, [lat, lon])


  return (
    <div className="App">
      {weather.description ? <ChangeImage image={weather.description} /> : null}
      <Search fn={handleWeather} />
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{weather.data.name}</p>
          </div>
          <div className="temp">
            {weather.temp ? <h1>{weather.temp} ºC</h1> : null}
            <div className='description-wrapper'>
              {weather.icon ? <WeatherIcon value={weather.icon} /> : null}
              <div className="description">{weather.status}</div>
            </div>
          </div>

        </div>
        <div className="bottom">
          <div className="feels">
            {weather.feels ? <p>{weather.feels} ºC</p> : null}
            <p className="info">Feels like</p>
          </div>
          <div className="humidity">
            {weather.humidity ? <p>{weather.humidity}%</p> : null}
            <p className="info">Humidity</p>
          </div>
          <div className="wind">
            {weather.speed ? <p>{weather.speed}km/h</p> : null}
            <p className="info">Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
