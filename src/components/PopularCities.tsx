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
    <div className={`p-4 rounded-lg w-full h-full flex flex-col`}>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-bold">Popular Cities</p>
      </div>
      <div className="w-full flex-1 overflow-y-auto">
        <table className="w-full table-fixed text-sm">
          <tbody>
            {cities.map((city) => (
              <tr
                key={city.name}
                className={`group transition-colors cursor-pointer border-b last:border-b-0
                  ${
                    isDark
                      ? "border-white/15 hover:bg-white/10"
                      : "border-gray-200 hover:bg-gray-100"
                  }
                `}
              >
                <td className="pl-2 py-2 font-medium">{city.name}</td>
                <td className="pr-2 py-2 text-xs opacity-80 text-right">
                  {city.condition}
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
