import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    console.log("effect run, currency is now", currency);

    if (currency) {
      console.log("fetching exchange rates..");
      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then((response) => {
          setRates(response.data.rates);
        });
    }
  }, [currency]);

  const onSearch = (event) => {
    event.preventDefault();
    setCurrency(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        Currency: <input value={value} onChange={handleChange} />
        <button type="submit">Exchange Rate</button>
      </form>
      <pre>{JSON.stringify(rates, null, 2)}</pre>
    </div>
  );
};

export default App;
