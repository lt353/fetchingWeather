import React, {useEffect, useState} from "react";

function App() {
  const [forecast, setForecast] = useState([]);
  const [zip, setZip] = useState("90210");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setZip(event.target.zip.value);
  }

  useEffect(() => {
    async function fetchForecast() {
      setForecast([]);
      setIsLoading(true);
      setErrorMessage("");

      const url = `https://wp.zybooks.com/weather.php?zip=${zip}`;
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setForecast(result.forecast);
        }
        else {
          setErrorMessage(result.error);
        }

          setIsLoading(false);
        }
      }
  
      fetchForecast();
    }, [zip]);

  return (
    <>
      <h1>Five Day Weather Forecast for {zip}</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="number"
          id="zip"
          min="11111"
          max="99999"
        />

        {errorMessage.length > 0 && <p>{errorMessage}</p>}

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ol>
            {forecast.map((day, index) => (
              <li key={index}>
                High: {day.high},
                Low: {day.low},
                Desc: {day.desc}
              </li>
            ))}
          </ol>
        )}
      </form>
    </>
  );
}

export default App;


