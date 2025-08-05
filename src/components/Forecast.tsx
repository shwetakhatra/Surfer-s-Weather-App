import type { FC, ReactNode } from "react";

interface ForecastDay {
  date: string;
  day: string;
  temp: string;
  icon: ReactNode;
}

interface ForecastProps {
  theme: string;
  days?: ForecastDay[];
}

const defaultDays: ForecastDay[] = [
  { date: "25 Jul", day: "Thu", temp: "24° / 22°", icon: "🌧️" },
  { date: "26 Jul", day: "Fri", temp: "24° / 22°", icon: "⛅" },
  { date: "27 Jul", day: "Sat", temp: "24° / 22°", icon: "🌦️" },
  { date: "28 Jul", day: "Sun", temp: "24° / 22°", icon: "🌧️" },
  { date: "29 Jul", day: "Mon", temp: "24° / 22°", icon: "☀️" },
  { date: "30 Jul", day: "Tue", temp: "24° / 22°", icon: "⛅" },
  { date: "31 Jul", day: "Sun", temp: "24° / 22°", icon: "🌧️" },
];

const Forecast: FC<ForecastProps> = ({ theme, days = defaultDays }) => {
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
            {days.map((f, i) => (
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
