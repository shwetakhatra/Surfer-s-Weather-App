import type { FC } from "react";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import PopularCities from "./PopularCities";
import WeatherSummary from "./WeatherSummary";
import MapView from "./MapView";

interface City {
  id: number;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface DashboardProps {
  theme: "light" | "dark";
  onSelectCity: (city: City) => void;
}

const Dashboard: FC<DashboardProps> = ({ theme, onSelectCity }) => {
  const isDark = theme === "dark";

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 h-auto">
      {/* Left Column (Mobile: all components stacked) */}
      <div className="space-y-4 md:flex md:flex-col md:justify-normal md:col-span-1">
        <SearchBar theme={theme} onSelectCity={onSelectCity} />
        <CurrentWeather theme={theme} />
        <Forecast theme={theme} />
      </div>

      {/* Merged Center + Right Columns (Desktop grid, Mobile stacked) */}
      <div className="space-y-4 md:space-y-0 md:col-span-3 grid-cols-1 md:grid md:grid-rows-[auto_auto] gap-4">
        {/* Map and PopularCities in a row on desktop, stacked on mobile */}
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
        {/* WeatherSummary full width below, stacked on mobile */}
        <div
          className={`p-4 rounded-lg ${
            isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-800"
          }`}
        >
          <WeatherSummary theme={theme} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
