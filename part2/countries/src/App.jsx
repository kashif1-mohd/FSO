import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useEffect } from "react";
import axios from "axios";

const ShowResults = ({ filteredCountries, setSearchFilter }) => {
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital:{country.capital}</div>
        <div>Population:{country.population} </div>
        <h1>Languages</h1>
        <ul>
          {Object.entries(country.languages).map(([code, name]) => (
            <li key={code}>{name}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} width="20%" />
      </div>
    );
  }
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else {
    return (
      <>
        {filteredCountries.map((country) => (
          <div key={country.cca3}>
            {country.name.common}{" "}
            <button
              value={country.name.common}
              onClick={(event) => setSearchFilter(event.target.value)}
            >
              Show
            </button>
          </div>
        ))}
      </>
    );
  }
};

const App = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchFilter.toLowerCase())
  );
  console.log(filteredCountries);
  const handleSearchChange = (event) => {
    setSearchFilter(event.target.value);
  };

  return (
    <div>
      Find Countries{" "}
      <input value={searchFilter} onChange={handleSearchChange} />
      <ShowResults
        filteredCountries={filteredCountries}
        setSearchFilter={setSearchFilter}
      />
    </div>
  );
};
export default App;
