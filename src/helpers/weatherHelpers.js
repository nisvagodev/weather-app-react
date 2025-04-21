export const kelvinToCelsius = (temp) => parseInt(temp - 273.15);

export const getWeatherIconUrl = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;
