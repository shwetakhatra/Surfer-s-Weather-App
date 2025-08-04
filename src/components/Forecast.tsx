import type { FC } from "react";

interface ForecastProps {
  theme: string;
}

const Forecast: FC<ForecastProps> = ({ theme }) => {
  return (
    <div
      className={`p-4 rounded-lg ${
        theme === "dark"
          ? "bg-white/10 text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-semibold">Forecast</p>
        <div className="space-x-2 text-sm">
          <button className="bg-white/20 px-2 py-1 rounded">7 Days</button>
          <button className="hover:underline">10 Days</button>
        </div>
      </div>
      <ul
        className={`space-y-1 text-sm ${
          theme === "dark" ? "text-white/80" : "text-gray-700"
        }`}
      >
        <li>25 Jul, Thu – 24° / 22°</li>
        <li>26 Jul, Fri – 24° / 22°</li>
        <li>27 Jul, Sat – 24° / 22°</li>
        <li>28 Jul, Sun – 24° / 22°</li>
        <li>29 Jul, Mon – 24° / 22°</li>
      </ul>
    </div>
  );
};

export default Forecast;
