import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filterContinent, setFilterContinent] = useState("");
  const [filterSubregion, setFilterSubregion] = useState("");
  const [sortOption, setSortOption] = useState("alphabetical"); 
  const [top10, setTop10] = useState(false);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries data:", error);
      }
    }
    fetchCountries();
  }, []);

  const filteredCountries = countries
    .filter((country) => {
      if (filterContinent) {
        return (
          country.continents && country.continents.includes(filterContinent)
        );
      }
      if (filterSubregion) {
        return country.subregion === filterSubregion;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOption === "alphabetical") {
        return a.name.common.localeCompare(b.name.common);
      } else if (sortOption === "population") {
        return b.population - a.population;
      } else if (sortOption === "area") {
        return b.area - a.area;
      }
      return 0;
    })
    .slice(0, top10 ? 10 : countries.length);

  const handleContinentChange = (e) => {
    setFilterContinent(e.target.value);
    setFilterSubregion(""); // Clear subregion filter
  };

  const handleSubregionChange = (e) => {
    setFilterSubregion(e.target.value);
    setFilterContinent(""); // Clear continent filter
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const toggleTop10 = () => {
    setTop10((prevTop10) => !prevTop10);
  };

  return (
    <div>
      <h1>Countries of the World</h1>
      <div>
        <label>
          Filter by Continent:
          <select value={filterContinent} onChange={handleContinentChange}>
            <option value="">All</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </label>
        <label>
          Filter by Subregion:
          <select value={filterSubregion} onChange={handleSubregionChange}>
            <option value="">All</option>
            <option value="Northern Europe">Northern Europe</option>
            <option value="Southern Europe">Southern Europe</option>
            <option value="Eastern Asia">Eastern Asia</option>
            <option value="Middle Africa">Middle Africa</option>
            {/* Add more options as desired */}
          </select>
        </label>
        <label>
          Sort by:
          <select value={sortOption} onChange={handleSortChange}>
            <option value="alphabetical">Alphabetical</option>
            <option value="population">Population</option>
            <option value="area">Area</option>
          </select>
        </label>
        <label>
          <input type="checkbox" checked={top10} onChange={toggleTop10} />
          Top 10
        </label>
      </div>
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
