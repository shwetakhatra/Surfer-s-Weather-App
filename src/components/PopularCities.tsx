import { useEffect, useState } from "react";
import type { FC } from "react";
import { fetchWeatherByCoords } from "../api/weather";

interface PopularCitiesProps {
  theme: string;
}

interface City {
  name: string;
  latitude: number;
  longitude: number;
}

interface CityWeather {
  name: string;
  temperature: number | null;
  unit: string;
}

const germanCities: City[] = [
  { name: "Berlin", latitude: 52.52, longitude: 13.405 },
  { name: "Hamburg", latitude: 53.5511, longitude: 9.9937 },
  { name: "Munich", latitude: 48.1351, longitude: 11.582 },
  { name: "Cologne", latitude: 50.9375, longitude: 6.9603 },
  { name: "Frankfurt", latitude: 50.1109, longitude: 8.6821 },
];

const PopularCities: FC<PopularCitiesProps> = ({ theme }) => {
  const [cityWeatherData, setCityWeatherData] = useState<CityWeather[]>([]);
  const isDark = theme === "dark";

  useEffect(() => {
    const fetchCitiesWeather = async () => {
      const results: CityWeather[] = await Promise.all(
        germanCities.map(async (city) => {
          try {
            const res = await fetchWeatherByCoords({
              latitude: city.latitude,
              longitude: city.longitude,
              current: ["temperature_2m"],
            });

            if (res && res.current) {
              return {
                name: city.name,
                temperature: res.current.temperature ?? null,
                unit: res.current_weather_units?.temperature ?? "°C",
              };
            } else {
              return {
                name: city.name,
                temperature: null,
                unit: "°C",
              };
            }
          } catch (error) {
            console.error("Error fetching weather for", city.name);
            return {
              name: city.name,
              temperature: null,
              unit: "°C",
            };
          }
        }),
      );

      setCityWeatherData(results);
    };

    fetchCitiesWeather();
  }, []);

  return (
    <div className={`p-4 rounded-lg w-full h-full flex flex-col`}>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-bold">Popular Cities</p>
      </div>
      <div className="w-full flex-1 overflow-y-auto">
        <table className="w-full table-fixed text-sm">
          <tbody>
            {cityWeatherData.map((city) => (
              <tr
                key={city.name}
                className={`group transition-colors cursor-pointer border-b last:border-b-0 ${
                  isDark
                    ? "border-white/15 hover:bg-white/10"
                    : "border-gray-200 hover:bg-gray-100"
                }`}
              >
                <td className="pl-2 py-2 font-medium">{city.name}</td>
                <td className="pr-2 py-2 text-xs opacity-80 text-right">
                  {city.temperature !== null
                    ? `${city.temperature} ${city.unit}`
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PopularCities;
