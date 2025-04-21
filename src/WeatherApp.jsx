import { useWeather } from "./hooks/useWeather";
import { kelvinToCelsius, getWeatherIconUrl } from "./helpers/weatherHelpers";

export const WeatherApp = () => {
  const { ciudad, data, handleChange, handleSubmit } = useWeather();

  return (
    <>
      <h1>Aplicación de clima</h1>
      <form onSubmit={handleSubmit} className="container">
        <input
          type="text"
          value={ciudad}
          onChange={handleChange}
          placeholder="Ingresa una ciudad"
        />
        <button type="submit">Buscar</button>
      </form>

      {data && (
        <div>
          <h2>{`${data.name}, ${data.sys.country}`}</h2>
          <p>Temperatura: {kelvinToCelsius(data.main.temp)}°C</p>
          <p>Condición: {data.weather[0].description}</p>
          <img
            src={getWeatherIconUrl(data.weather[0].icon)}
            alt={data.weather[0].description}
          />
        </div>
      )}
    </>
  );
};
