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
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchCountries = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          signal,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setCountries(data);
        setError(false);
      } catch (err) {
        setError(true);
        console.error("API fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          {filteredCountries.map((country) => (
            <div
              className="countryCard"
              key={country.name}
              data-testid="country-card"
            >
              <img
                src={country.flag}
                alt={`Flag of ${country.name}`}
              />
              <p>{country.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
