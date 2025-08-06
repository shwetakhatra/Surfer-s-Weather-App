import type { FC, ReactNode } from "react";

interface RawDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode?: number[];
}

interface ForecastDay {
  date: string;
  day: string;
  temp: string;
  icon: ReactNode;
}

interface ForecastProps {
  theme: string;
  days?: RawDaily;
}

const getWeatherIcon = (code: number) => {
  if (code >= 200 && code < 300) return "⛈️";
  if (code >= 300 && code < 600) return "🌧️";
  if (code >= 600 && code < 700) return "❄️";
  if (code === 800) return "☀️";
  if (code === 801) return "🌤️";
  if (code > 801) return "☁️";
  return "🌈";
};

const Forecast: FC<ForecastProps> = ({ theme, days }) => {
  if (!days || !days.time.length) {
    return (
      <div
        className={`p-4 rounded-lg ${
          theme === "dark"
            ? "bg-white/10 text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <p className="text-center text-sm opacity-60">
          No forecast data available.
        </p>
      </div>
    );
  }

  const forecastDays: ForecastDay[] = days.time.map((dateStr, i) => {
    const dateObj = new Date(dateStr);
    const day = dateObj.toLocaleDateString("en-GB", { weekday: "short" });
    const date = dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

    const maxTemp = days.temperature_2m_max[i];
    const minTemp = days.temperature_2m_min[i];
    const weatherCode = days.weathercode ? days.weathercode[i] : 800;

    return {
      date,
      day,
      temp: `${maxTemp.toFixed(0)}° / ${minTemp.toFixed(0)}°`,
      icon: getWeatherIcon(weatherCode),
    };
  });

  return (
    <div
      className={`p-4 rounded-lg ${
        theme === "dark"
          ? "bg-white/10 text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-bold">7 Days Forecast</p>
      </div>
      <div className="w-full flex-1 ">
        <table className="w-full table-fixed text-sm">
          <tbody>
            {forecastDays.map((f, i) => (
              <tr
                key={i}
                className={`group transition-colors border-b last:border-b-0
            ${
              theme === "dark"
                ? "border-white/15 hover:bg-white/10"
                : "border-gray-200 hover:bg-gray-100"
            }
          `}
              >
                <td className="pl-1 py-1">
                  <span className="text-lg">{f.icon}</span>
                </td>
                <td className="py-1">{f.temp}</td>
                <td className="pr-1 py-1 whitespace-nowrap text-xs opacity-80">
                  {f.date}, {f.day}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Forecast;
