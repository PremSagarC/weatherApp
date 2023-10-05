import React from "react";
import "./Current.css";

const CurrentWeather = ({ data }) => {
  let dataInC = (data.main.temp - 273).toFixed(1);
  let maxDataInC = (data.main.temp_max - 273).toFixed(1);
  let minDataInC = (data.main.temp_min - 273).toFixed(1);

  let feelsLike = (data.main.feels_like - 273).toFixed(1);

  return (
    <div className="weather">
      <div className="top">
        <div className="">
          <p className="city">{data.city}</p>
          <p className="weather-description">
            {data.weather[0].description}
          </p>
        </div>
        <img
          src={`icons/${data.weather[0].icon}.png`}
          alt="weather"
          className="weather-icon"
        />
      </div>
      <div className="bottom">
        <div className="temps">
          <p className="temperature">{dataInC}°C</p>
          <div className="temp">
            <div className="parameter-temps">
              <span className="paramete-label">
                Max temp:
              </span>
              <span className="paramete-value">
                {maxDataInC}°C
              </span>
            </div>
            <div className="parameter-temps">
              <span className="paramete-label">
                Min temp :
              </span>
              <span className="paramete-value">
                {minDataInC}°C
              </span>
            </div>
          </div>
        </div>
        <div className="details">
          <div className="parameter-row">
            <span className="header">Details</span>
          </div>
          <div className="parameter-row">
            <span className="paramete-label">
              Feels like
            </span>
            <span className="paramete-value">
              {feelsLike}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="paramete-label">Wind</span>
            <span className="paramete-value">
              {data.wind.speed}m/s
            </span>
          </div>
          <div className="parameter-row">
            <span className="paramete-label">
              Humidity
            </span>
            <span className="paramete-value">
              {data.main.humidity}%
            </span>
          </div>
          <div className="parameter-row">
            <span className="paramete-label">
              Pressure
            </span>
            <span className="paramete-value">
              {data.main.pressure} hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
