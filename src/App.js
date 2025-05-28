import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        setError(true);
        console.error("API fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
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
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchInput"
        data-testid="search-input"
      />

      {loading && <p data-testid="loading-text">Loading...</p>}
      {error && <p data-testid="error-text">Failed to load countries.</p>}

      {!loading && !error && (
        <div className="countriesGrid" data-testid="countries-grid">
          {filteredCountries.map((country, index) => (
            <div className="countryCard" key={index} data-testid="country-card">
              <img src={country.png} alt={`Flag of ${country.common}`} />
              <p>{country.common}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
