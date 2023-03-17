import logo from './logo.svg';
import './App.css';
import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  //Declare a new state variable to store location, to make sure the user aproved the use of the location
  const [location, setLocation] = useState(false);
  //Declare a new state to store the weather data from the API
  const [weather, setWeather] = useState(false);

  //A function expression to fetch data from the API 
  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'en',
        units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data);
  }

  //Ask the user to get the location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      //Call getWeather on App run
      getWeather(position.coords.latitude, position.coords.longitude);
      //console.log(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })
  }, [])

  //Check if the user allowed the location, if not return the message about the use of the location to run the main algorithm of the App
  if (location == false) {
    return (
      <Fragment>
        You need to allow the location to use the App
      </Fragment>
    );
  } else if(weather == false){ //As we are calling an async, to make sure the App only try to show the info after the calling of the API
    return(
      <fragment>
        Loading weather...
      </fragment>
    )
  }else {
    return (
      <Fragment>
        <h3>Climate in your coordinates: ({weather["weather"][0]["description"]})</h3>
        <hr />
        <ul>
          <li>Current Temperature: {weather["main"]["temp"]}°</li>
          <li>Max Temperature: {weather["main"]["temp_max"]}°</li>
          <li>Min Temperature: {weather["main"]["temp_min"]}°</li>
          <li>Pressure: {weather["main"]["pressure"]} hPa</li>
          <li>Humidity: {weather["main"]["humidity"]}%</li>
        </ul>
      </Fragment>
    );
  }
}

export default App;
