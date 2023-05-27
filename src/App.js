import './App.css';
import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Thunderstorm from './thunderstorm';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  //Declare a new state variable to store location, to make sure the user aproved the use of the location
  const [location, setLocation] = useState(false);
  //Declare a new state to store the weather data from the API
  const [weather, setWeather] = useState(false);
  const [weatherEffect, setWeatherEffect] = useState(null); // State to store the weather effect component


  //A function expression to fetch data from the API 
  let getWeather = async (lat, long) => {
    try {
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
      var weatherEffect;
      if (res.data["weather"][0]["main"].includes('Clear')) { //when the weather is clear sky
        weatherEffect = document.createElement('div');
        weatherEffect.className = "clear";
        document.body.appendChild(weatherEffect);
      } else if (res.data["weather"][0]["main"].includes('Rain')) { //when the weather is rain
        weatherEffect = document.createElement('section');
        weatherEffect.className = "rain";
        document.body.appendChild(weatherEffect);
      } else if (res.data["weather"][0]["main"].includes('Clouds')) { //when the weather is clouds
        weatherEffect = document.createElement('div');
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
      } else if (res.data["weather"][0]["main"].includes('Snow')) { //when the weather is snow
        weatherEffect = document.createElement('div');
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
      } else if (res.data["weather"][0]["main"].includes('Drizzle')) { //when the weather is Drizzle
        weatherEffect = document.createElement('div');
        weatherEffect.className = "drizzles";
        document.body.appendChild(weatherEffect);

        var drizzle_drop1 = document.createElement('div');
        drizzle_drop1.className = "drizzle drizzle_drop1";
        var drizzle_drop2 = document.createElement('div');
        drizzle_drop2.className = "drizzle drizzle_drop2";
        var drizzle_drop3 = document.createElement('div');
        drizzle_drop3.className = "drizzle drizzle_drop3";
        var drizzle_drop4 = document.createElement('div');
        drizzle_drop4.className = "drizzle drizzle_drop4";
        var drizzle_drop5 = document.createElement('div');
        drizzle_drop5.className = "drizzle drizzle_drop5";
        var drizzle_drop6 = document.createElement('div');
        drizzle_drop6.className = "drizzle drizzle_drop6";
        var drizzle_drop7 = document.createElement('div');
        drizzle_drop7.className = "drizzle drizzle_drop7";
        var drizzle_drop8 = document.createElement('div');
        drizzle_drop8.className = "drizzle drizzle_drop8";
        var drizzle_drop9 = document.createElement('div');
        drizzle_drop9.className = "drizzle drizzle_drop9";
        var drizzle_drop10 = document.createElement('div');
        drizzle_drop10.className = "drizzle drizzle_drop10";
        var drizzle_drop11 = document.createElement('div');
        drizzle_drop11.className = "drizzle drizzle_drop11";

        weatherEffect.appendChild(drizzle_drop1);
        weatherEffect.appendChild(drizzle_drop2);
        weatherEffect.appendChild(drizzle_drop3);
        weatherEffect.appendChild(drizzle_drop4);
        weatherEffect.appendChild(drizzle_drop5);
        weatherEffect.appendChild(drizzle_drop6);
        weatherEffect.appendChild(drizzle_drop7);
        weatherEffect.appendChild(drizzle_drop8);
        weatherEffect.appendChild(drizzle_drop9);
        weatherEffect.appendChild(drizzle_drop10);
        weatherEffect.appendChild(drizzle_drop11);
      } else if (res.data["weather"][0]["main"].includes('Thunderstorm')) { // when the weather is Clear
        weatherEffect = document.createElement('section');
        weatherEffect.className = "rain";
        document.body.appendChild(weatherEffect);
        setWeatherEffect(
          <div className="thunderstorm">
            <Thunderstorm />
          </div>
        );
      }
    } catch (error) {
      console.error(error);
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
        <div id='weather_container'>
          <h1 id='current_weather'>{Math.round(weather["main"]["temp"])}°C</h1>
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
          <div id="author">
          <a target="_blank" href="https://github.com/sastelvios" rel="noreferrer">
            <i class="fab fa-github"></i>
            Sastelvio Serafim MANUEL
          </a>
        </div>
        </div>

        {weatherEffect}

        
      </Fragment>
    );
  }
}

export default App;
