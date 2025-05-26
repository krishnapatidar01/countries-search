import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
      });
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  return (
    <div className="container">
      <h1>Country Flags Search</h1>
      <input
        type="text"
        placeholder="Search for a country"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchInput"
      />
      <div className="countriesGrid">
        {filteredCountries.map((country, index) => (
          <div className="countryCard" key={index}>
            <img src={country.png} alt={country.common} />
            <p>{country.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
