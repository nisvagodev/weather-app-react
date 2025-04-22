# Aplicación del Clima con React (Arquitectura Modular)

Link para ver resultado: [APLICACION DE CLIMA RESULTADO FINAL](https://clima2-app-react.netlify.app/)

Aplicación meteorológica que muestra información del tiempo para cualquier ciudad usando la API de OpenWeatherMap, implementada con React usando una arquitectura modular que separa lógica, componentes y helpers.

## Características principales
- Búsqueda por ciudad con validación
- Visualización de temperatura, condiciones climáticas e iconos
- Arquitectura modular (custom hooks + helpers)
- Conversión automática de unidades (Kelvin a Celsius)

## Estructura del proyecto
```
src/
├── components/
│ └── WeatherApp.jsx # Componente principal
├── hooks/
│ └── useWeather.js # Lógica de negocio
└── helpers/
└── weatherHelpers.js # Funciones utilitarias
```

## Instalación
1. Clona el repositorio:
```
git clone https://github.com/tu-usuario/app-clima-react.git
cd app-clima-react
```
2. Instala dependencias:
```
npm install
```
3. Configura tu API key -
Crea un archivo .env en la raíz:
```
VITE_OPENWEATHER_API_KEY=tu_api_key_aquí
```

##  Implementación

1. Custom Hook: useWeather.js
```
import { useState } from "react";

export const useWeather = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  const [ciudad, setCiudad] = useState("");
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCiudad(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ciudad.trim()) {
      setError("Por favor ingresa una ciudad");
      return;
    }

    try {
      setCargando(true);
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${apiKey}`);
      if (!response.ok) throw new Error("Ciudad no encontrada");
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return { ciudad, data, cargando, error, handleChange, handleSubmit };
};
```
2. Helpers: weatherHelpers.js
```
export const kelvinACelsius = (temp) => parseInt(temp - 273.15);

export const obtenerUrlIcono = (icono) => 
  `https://openweathermap.org/img/wn/${icono}@2x.png`;

export const formatearDatosClima = (data) => ({
  ciudad: `${data.name}, ${data.sys.country}`,
  temp: kelvinACelsius(data.main.temp),
  descripcion: data.weather[0].description,
  icono: data.weather[0].icon,
  humedad: data.main.humidity,
  viento: data.wind.speed
});
```
3. Componente principal: WeatherApp.jsx
```
import { useWeather } from "../hooks/useWeather";
import { obtenerUrlIcono, formatearDatosClima } from "../helpers/weatherHelpers";

export const WeatherApp = () => {
  const { ciudad, data, cargando, error, handleChange, handleSubmit } = useWeather();
  const datosClima = data && formatearDatosClima(data);

  return (
    <div className="contenedor-clima">
      <h1>🌤️ App del Clima</h1>
      
      <form onSubmit={handleSubmit} className="formulario-busqueda">
        <input
          type="text"
          value={ciudad}
          onChange={handleChange}
          placeholder="Ingresa una ciudad"
          aria-label="Buscar ciudad"
        />
        <button type="submit" disabled={cargando}>
          {cargando ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {error && <p className="mensaje-error">⚠️ {error}</p>}

      {datosClima && (
        <div className="tarjeta-clima">
          <h2>{datosClima.ciudad}</h2>
          <div className="clima-principal">
            <img 
              src={obtenerUrlIcono(datosClima.icono)} 
              alt={datosClima.descripcion} 
            />
            <p className="temperatura">{datosClima.temp}°C</p>
          </div>
          <p className="descripcion">{datosClima.descripcion}</p>
          <div className="detalles-clima">
            <span>💧 Humedad: {datosClima.humedad}%</span>
            <span>🌬️ Viento: {datosClima.viento} m/s</span>
          </div>
        </div>
      )}
    </div>
  );
};
```

