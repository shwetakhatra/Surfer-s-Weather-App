import type { FC } from "react";

interface CurrentWeatherProps {
  theme: string;
}

const CurrentWeather: FC<CurrentWeatherProps> = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`p-4 rounded-lg flex flex-col gap-2 ${
        isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <p className="text-sm">Current Weather</p>
      <h2 className="text-4xl font-semibold">24°C</h2>
      <p>Heavy Rain</p>
      <div
        className={`text-sm mt-2 space-y-1 ${
          isDark ? "text-white/70" : "text-gray-600"
        }`}
      >
        <p>Humidity: 92%</p>
        <p>Wind: 6km/h</p>
        <p>Visibility: 3km</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
