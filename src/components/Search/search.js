import React, {useState} from "react";
import { requestByLocation } from "../../openWeatherMap";



export function Search (props) {
    const [location, setLocation] = useState('')


    const searchLocation = (event) => {
        
    if (event.key === "Enter") {
      requestByLocation(location).then(props.fn)
      setLocation('')
    }
  }
    return (
        
        <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter location"
          type="text" />
      </div>
    )
}