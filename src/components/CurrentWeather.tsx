import type { FC } from "react";
import {
  CloudIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/solid";
import type { Weather } from "../api/weather";

interface CurrentWeatherProps {
  theme: string;
  weather: Weather | null;
  cityName?: string;
}

const CurrentWeather: FC<CurrentWeatherProps> = ({
  theme,
  weather,
  cityName,
}) => {
  const isDark = theme === "dark";
  return (
    <div
      className={`p-4 rounded-lg flex flex-col gap-3 shadow-md ${
        isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-bold tracking-wide">
          {cityName ? `Current Weather in ${cityName}` : "Current Weather"}
        </p>
        <CloudIcon className="w-8 h-8 text-blue-400 drop-shadow" />
      </div>

      {weather?.current ? (
        <>
          <div className="flex items-center gap-4">
            <span className="text-5xl font-extrabold">
              {weather.current.temperature}
              {weather.current_weather_units?.temperature}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-medium">
                {weather.current.weathercode || "Unknown"}{" "}
                {weather.current_weather_units?.weathercode}
              </span>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-xs">
                  <ArrowUpIcon className="w-4 h-4 text-red-400" />
                  {weather.daily?.temperature_2m_max[0]}
                  {weather.current_weather_units?.winddirection}
                </span>
                <span className="flex items-center gap-1 text-xs">
                  <ArrowDownIcon className="w-4 h-4 text-blue-400" />
                  {weather.daily?.temperature_2m_min[0]}
                  {weather.current_weather_units?.winddirection}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`grid grid-cols-3 gap-2 text-sm mt-2 rounded-lg px-2 py-1 ${
              isDark ? "bg-white/5 text-white/80" : "bg-white text-gray-600"
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="font-bold">{weather.elevation}</span>
              <span className="text-xs opacity-70">Elevation</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">
                {weather.current.windspeed}{" "}
                {weather.current_weather_units?.windspeed}
              </span>
              <span className="text-xs opacity-70">Wind</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">
                {weather.current.winddirection}{" "}
                {weather.current_weather_units?.winddirection}
              </span>
              <span className="text-xs opacity-70">Wind Direction</span>
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm italic text-center">Loading weather...</p>
      )}
    </div>
  );
};

export default CurrentWeather;
