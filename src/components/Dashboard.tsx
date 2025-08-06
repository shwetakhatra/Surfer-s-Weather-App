import { useEffect, useState, useCallback } from "react";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import PopularCities from "./PopularCities";
import WeatherSummary from "./WeatherSummary";
import MapView from "./MapView";
import { fetchWeatherByCoords } from "../api/weather";
import type { Weather } from "../api/weather";
import { getWeatherCondition } from "../utils/weatherUtils";

interface City {
  id: number;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface DashboardProps {
  theme: "light" | "dark";
  setWeather: (condition: string) => void;
}

const Dashboard = ({ theme, setWeather }: DashboardProps) => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const isDark = theme === "dark";

  const fetchAndSetWeather = useCallback(
    async (latitude: number, longitude: number) => {
      setLoading(true);
      try {
        const weatherData = await fetchWeatherByCoords({
          latitude,
          longitude,
          current: ["temperature_2m", "weather_code", "wind_speed_10m"],
          hourly: ["temperature_2m"],
          daily: ["temperature_2m_max", "temperature_2m_min"],
        });
        if (weatherData?.current) {
          setCurrentWeather({
            current: weatherData.current,
            daily: weatherData.daily,
            hourly: weatherData.hourly,
            current_weather_units: weatherData.current_weather_units,
            elevation: weatherData.elevation,
          });

          const condition = getWeatherCondition(
            weatherData.current.weathercode as number,
          );
          setWeather(condition);
        }
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      } finally {
        setLoading(false);
      }
    },
    [setWeather],
  );

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    fetchAndSetWeather(city.latitude, city.longitude);
  };

  useEffect(() => {
    if (selectedCity) return;

    if (!navigator.geolocation) {
      console.warn("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchAndSetWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.warn("Error getting geolocation:", error);
      },
    );
  }, [selectedCity, fetchAndSetWeather]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 h-auto">
      <div className="space-y-4 md:flex md:flex-col md:justify-normal md:col-span-1">
        <SearchBar theme={theme} onSelectCity={handleCitySelect} />
        <CurrentWeather theme={theme} weather={currentWeather} />
        <Forecast theme={theme} />
      </div>

      <div className="space-y-4 md:space-y-0 md:col-span-3 grid-cols-1 md:grid md:grid-rows-[auto_auto] gap-4">
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 gap-4">
          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-800"
            } md:col-span-2`}
          >
            <MapView />
          </div>
          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-800"
            } md:col-span-1`}
          >
            <PopularCities theme={theme} />
          </div>
        </div>
        <div
          className={`p-4 rounded-lg ${
            isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-800"
          }`}
        >
          <WeatherSummary theme={theme} hourly={currentWeather?.hourly} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
