import type { FC } from "react";
import { GlobeAltIcon } from "@heroicons/react/24/solid";

interface HeaderProps {
  theme: string;
}

const Header: FC<HeaderProps> = ({ theme }) => {
  return (
    <header
      className={`w-full shadow-md z-50 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GlobeAltIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1
            title="Surfer’s Weather"
            className={`w-full text-xl sm:text-2xl font-bold ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
          >
            Surfer’s Weather
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
