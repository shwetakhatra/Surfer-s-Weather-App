import type { FC } from "react";

interface WeatherSummaryProps {
  theme: string;
}

const WeatherSummary: FC<WeatherSummaryProps> = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`p-4 rounded-lg ${
        isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-semibold">Summary</p>
        <div className="space-x-2 text-sm">
          <button className="bg-white/20 px-2 py-1 rounded">Summary</button>
          <button className="hover:underline">Hourly</button>
          <button className="hover:underline">More Details</button>
        </div>
      </div>
      <div className="text-xs text-white/80">
        <p>Now – Rain 76%</p>
        <p>7 PM – Rain 78%</p>
        <p>11 PM – Rain 79%</p>
      </div>
    </div>
  );
};

export default WeatherSummary;
