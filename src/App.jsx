import { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="countryContainer">
        {filteredCountries.map((country) => (
          <div className="countryCard" key={country.common}>
            <img src={country.png} alt={`${country.common} flag`} />
            <h2>{country.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
