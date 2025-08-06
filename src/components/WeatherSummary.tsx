import type { FC } from "react";
import { CloudIcon } from "@heroicons/react/24/solid";

interface WeatherSummaryProps {
  theme: string;
}

const summary = [
  { time: "Now", label: "Rain", value: 76, icon: CloudIcon },
  { time: "7 PM", label: "Rain", value: 78, icon: CloudIcon },
  { time: "11 PM", label: "Rain", value: 79, icon: CloudIcon },
  { time: "12 AM", label: "Rain", value: 79, icon: CloudIcon },
  { time: "1 AM", label: "Rain", value: 79, icon: CloudIcon },
];

const WeatherSummary: FC<WeatherSummaryProps> = ({ theme }) => {
  const isDark = theme === "dark";
  return (
    <div className={`rounded-lg h-full flex flex-col `}>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-bold">Summary</p>
      </div>
      <div className="flex flex-col gap-3">
        {summary.map((item) => (
          <div
            key={item.time}
            className={`flex items-center rounded-md px-3 py-2 gap-3 transition
              ${isDark ? "bg-white/5 hover:bg-white/15" : "bg-white hover:bg-gray-200"}
            `}
          >
            <item.icon className="h-6 w-6 text-blue-400 shrink-0" />
            <span className="text-xs w-14">{item.time}</span>
            <div className="flex-1">
              <div className="w-full bg-gray-300/30 rounded-full h-2 flex items-center">
                <div
                  style={{
                    width: `${item.value}%`,
                    background: isDark
                      ? "linear-gradient(90deg, #4fd1c5, #63b3ed)"
                      : "linear-gradient(90deg, #3182ce, #90cdf4)",
                  }}
                  className="h-2 rounded-full transition-all"
                ></div>
              </div>
            </div>
            <span className="text-xs font-semibold ml-2">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherSummary;
