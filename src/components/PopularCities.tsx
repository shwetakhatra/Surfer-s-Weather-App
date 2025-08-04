import type { FC } from "react";

interface PopularCitiesProps {
  theme: string;
}

const cities = [
  { name: "Delhi", condition: "Partly Cloudy" },
  { name: "Mumbai", condition: "Drizzle Rain" },
  { name: "Hyderabad", condition: "Heavy Rain" },
  { name: "Bangalore", condition: "Light Thunders" },
  { name: "Kolkata", condition: "Mostly Sunny" },
];

const PopularCities: FC<PopularCitiesProps> = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`p-4 rounded-lg ${
        isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-semibold">Popular Cities</p>
        <button className="text-xs underline">View more</button>
      </div>
      <ul
        className={`space-y-1 text-sm ${
          isDark ? "text-white/80" : "text-gray-600"
        }`}
      >
        {cities.map((city) => (
          <li key={city.name} className="flex justify-between">
            <span>{city.name}</span>
            <span>{city.condition}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularCities;
