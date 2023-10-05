import { useState } from "react";
import "./App.css";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";

import Search from "./components/Search/Search";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import Forecast from "./components/forescast/Forecast";

function App() {
  const [currentWeather, setCurrentWeather] =
    useState(null);
  const [forecast, setForecast] = useState(null);

  const handleSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `https://${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    const forecastFetch = fetch(
      `https://${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({
          city: searchData.label,
          ...weatherResponse,
        });
        setForecast({
          city: searchData.label,
          ...forecastResponse,
        });
      })
      .catch((error) => console.log(error));
  };

  // console.log(currentWeather);
  // console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleSearchChange} />
      {currentWeather && (
        <CurrentWeather data={currentWeather} />
      )}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
