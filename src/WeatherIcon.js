import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

export default function WeatherIcon(props) {
  let stat = props.value;
  let icon = "";
  switch (stat) {
    case '01d':
      icon = "CLEAR_DAY";
      break;
    case '13d':
      icon = "SNOW";
      break;
    case '13n':
      icon = "SNOW";
      break;
    case '03d':
      icon = "CLOUDY";
      break;
    case '03n':
      icon = "CLOUDY";
      break;
    case '04n':
      icon = "PARTLY_CLOUDY_NIGHT";
      break;
    case '04d':
      icon = "PARTLY_CLOUDY_DAY";
      break;
    case '09d':
      icon = "RAIN";
      break;
    case `10d`:
      icon = "RAIN";
      break;
    case '11d':
      icon = "RAIN";
      break;
    case '09n':
      icon = "RAIN";
      break;
    case '10n':
      icon = "RAIN";
      break;
    case '11n':
      icon = "RAIN";
      break;
    case '50n':
      icon = "FOG";
      break;
    case '50d':
      icon = "FOG";
      break;
    default:
      icon = "CLEAR_DAY";
  }

  return (
    <ReactAnimatedWeather
    icon={icon} animate={true}
    color="goldenrod"
  />
  
  );
}