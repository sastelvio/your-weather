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
    })
    setWeather(res.data);
    if (res.data["weather"][0]["main"].includes('Rain')) { //when the weather is rain
      var weatherEffect = document.createElement('section');
      weatherEffect.className = "rain";
      document.body.appendChild(weatherEffect);
    } else if (res.data["weather"][0]["main"].includes('Clouds')) { //when the weather is clouds
      var weatherEffect = document.createElement('div');
      weatherEffect.id = "clouds";
      var cloud1 = document.createElement('div');
      cloud1.className = "cloud x1";
      var cloud2 = document.createElement('div');
      cloud2.className = "cloud x2";
      var cloud3 = document.createElement('div');
      cloud3.className = "cloud x3";
      var cloud4 = document.createElement('div');
      cloud4.className = "cloud x4";
      var cloud5 = document.createElement('div');
      cloud5.className = "cloud x5";

      document.body.appendChild(weatherEffect);
      document.getElementById("clouds").appendChild(cloud1);
      document.getElementById("clouds").appendChild(cloud2);
      document.getElementById("clouds").appendChild(cloud3);
      document.getElementById("clouds").appendChild(cloud4);
      document.getElementById("clouds").appendChild(cloud5);
    } else if (res.data["weather"][0]["main"].includes('Snow')) { //when the weather is clouds
      var weatherEffect = document.createElement('div');
      weatherEffect.className = "snows";
      var snow_layer1_a = document.createElement('div');
      snow_layer1_a.className = "snow layer1 a";
      var snow_layer1 = document.createElement('div');
      snow_layer1.className = "snow layer1";
      var snow_layer2_a = document.createElement('div');
      snow_layer2_a.className = "snow layer2 a";
      var snow_layer2 = document.createElement('div');
      snow_layer2.className = "snow layer2";
      var snow_layer3_a = document.createElement('div');
      snow_layer3_a.className = "snow layer3 a";
      var snow_layer3 = document.createElement('div');
      snow_layer3.className = "snow layer3";

      document.body.appendChild(weatherEffect);
      weatherEffect.appendChild(snow_layer1_a);
      weatherEffect.appendChild(snow_layer1);
      weatherEffect.appendChild(snow_layer2_a);
      weatherEffect.appendChild(snow_layer2);
      weatherEffect.appendChild(snow_layer3_a);
      weatherEffect.appendChild(snow_layer3);
    }
    //console.log(es.data);
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
  if (location === false) {
    return (
      <Fragment>
        You need to allow the location to use the App
      </Fragment>
    );
  } else if (weather === false) { //As we are calling an async, to make sure the App only try to show the info after the calling of the API
    return (
      <Fragment>
        Loading weather...
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div id='current_weather_container'>
          <h1 id='current_weather'>{Math.round(weather["main"]["temp"])}°C</h1>
        </div>
        <h1>{weather["name"]}, {weather["sys"]["country"]}</h1>
        <h2>{weather["weather"][0]["main"]}</h2>
        <h5>({weather["weather"][0]["description"]})</h5>
        <hr />
        <ul>
          <li>Max Temperature: {Math.round(weather["main"]["temp_max"])}°C</li>
          <li>Min Temperature: {Math.round(weather["main"]["temp_min"])}°C</li>
          <li>Pressure: {weather["main"]["pressure"]} hPa</li>
          <li>Humidity: {weather["main"]["humidity"]}%</li>
        </ul>
      </Fragment>
    );
  }
}

export default App;
