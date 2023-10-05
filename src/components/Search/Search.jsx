import React, { useState } from "react";
import "./Search.css";

import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, url } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${url}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div className="search">
      <div className="logo">
        <img src="icons/logo.png" alt="logo" className="logoImage"/>
        <p>WeatherApp</p>
      </div>
      <AsyncPaginate
        placeholder="Enter the city name"
        debounceTimeout={600}
        value={search}
        onChange={handleChange}
        loadOptions={loadOptions}
        className="input"
      />
    </div>
  );
};

export default Search;
