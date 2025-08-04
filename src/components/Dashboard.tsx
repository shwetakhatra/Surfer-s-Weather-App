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
    <section className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 p-4">
      <div className="col-span-1 space-y-4">
        <SearchBar theme={theme} onSelectCity={onSelectCity} />
        <CurrentWeather theme={theme} />
        <Forecast theme={theme} />
      </div>
      <div className="col-span-2">
        <div
          className={`p-4 rounded-lg ${
            isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-800"
          } h-80`}
        >
          <MapView />
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
