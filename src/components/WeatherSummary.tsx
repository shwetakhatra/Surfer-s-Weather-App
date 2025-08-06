import type { FC } from "react";
import { CloudIcon } from "@heroicons/react/24/solid";
import type { Weather } from "../api/weather";

interface WeatherSummaryProps {
  theme: string;
  hourly?: Weather["hourly"];
}

const WeatherSummary: FC<WeatherSummaryProps> = ({ theme, hourly }) => {
  const isDark = theme === "dark";

  if (
    !hourly ||
    !Array.isArray(hourly.time) ||
    !Array.isArray(hourly.temperature_2m)
  ) {
    return (
      <p className="text-sm italic opacity-70">
        No hourly weather data available.
      </p>
    );
  }

  const now = Date.now();
  const startIndex = hourly.time.findIndex((timeStr) => {
    const timeMs = new Date(timeStr).getTime();
    return timeMs >= now;
  });

  const sliceStart = startIndex === -1 ? 0 : startIndex;

  const summary = hourly.time
    .slice(sliceStart, sliceStart + 10)
    .map((time, index) => {
      const rawTemp = hourly.temperature_2m[sliceStart + index];
      const temp =
        typeof rawTemp === "string" ? parseFloat(rawTemp) : (rawTemp ?? 0);
      const timeFormatted = new Date(time).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        time: timeFormatted,
        temp: `${temp.toFixed(0)}°C`,
        icon: CloudIcon,
      };
    });

  return (
    <div className={`rounded-lg h-full flex flex-col`}>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-bold">Today's Forcast</p>
      </div>

      <div
        className={`flex gap-3 overflow-x-auto mt-8
    scrollbar-hide
  `}
      >
        {summary.map((item, index) => (
          <div
            key={index}
            className={`min-w-[80px] flex flex-col items-center px-3 py-2 rounded-md shadow-sm transition text-center
        ${isDark ? "bg-white/5 text-white" : "bg-white text-black"}
      `}
          >
            <span className="text-xs font-medium">{item.time}</span>
            <item.icon className="h-8 w-8 my-2 text-blue-400" />
            <span className="text-sm font-semibold mt-1">{item.temp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherSummary;
