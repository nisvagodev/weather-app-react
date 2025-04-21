import { useState } from "react";

export const useWeather = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = "e2a569b37d235466bd796c11284d4aac";
  const [ciudad, setCiudad] = useState("");
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ciudad.trim()) return;

    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${apiKey}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return { ciudad, data, handleChange, handleSubmit };
};
