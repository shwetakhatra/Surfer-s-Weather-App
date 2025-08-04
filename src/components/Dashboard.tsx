import type { FC } from "react";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import PopularCities from "./PopularCities";
import WeatherSummary from "./WeatherSummary";

interface DashboardProps {
  theme: "light" | "dark";
}

const Dashboard: FC<DashboardProps> = ({ theme }) => {
  const isDark = theme === "dark";
  return (
    <section className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 p-4">
      <div className="col-span-1 space-y-4">
        <SearchBar theme={theme} />
        <CurrentWeather theme={theme} />
        <Forecast theme={theme} />
      </div>
      <div className="col-span-2">
        <div
          className={`p-4 rounded-lg ${
            isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-800"
          } h-80 flex items-center justify-center`}
        >
          [ Map Goes Here ]
        </div>
        <WeatherSummary theme={theme} />
      </div>
      <div className="col-span-1">
        <PopularCities theme={theme} />
      </div>
    </section>
  );
};

export default Dashboard;
