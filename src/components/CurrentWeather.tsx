import type { FC } from "react";
import { CloudIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

interface CurrentWeatherProps {
  theme: string;
}

const CurrentWeather: FC<CurrentWeatherProps> = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`p-4 rounded-lg flex flex-col gap-3 shadow-md ${
        isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Title */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-bold tracking-wide">Current Weather</p>
        <CloudIcon className="w-8 h-8 text-blue-400 drop-shadow" />
      </div>

      {/* Temperature and condition */}
      <div className="flex items-center gap-4">
        <span className="text-5xl font-extrabold">24°C</span>
        <div className="flex flex-col gap-1">
          <span className="text-lg font-medium">Heavy Rain</span>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-xs">
              <ArrowUpIcon className="w-4 h-4 text-red-400" />
              26°
            </span>
            <span className="flex items-center gap-1 text-xs">
              <ArrowDownIcon className="w-4 h-4 text-blue-400" />
              22°
            </span>
          </div>
        </div>
      </div>

      {/* Weather details */}
      <div
        className={`grid grid-cols-3 gap-2 text-sm mt-2 rounded-lg px-2 py-1 ${
          isDark ? "bg-white/5 text-white/80" : "bg-white text-gray-600"
        }`}
      >
        <div className="flex flex-col items-center">
          <span className="font-bold">92%</span>
          <span className="text-xs opacity-70">Humidity</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">6 km/h</span>
          <span className="text-xs opacity-70">Wind</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">3 km</span>
          <span className="text-xs opacity-70">Visibility</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;