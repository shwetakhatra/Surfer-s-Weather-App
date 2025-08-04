import type { FC } from "react";
import { MoonIcon, SunIcon, GlobeAltIcon } from "@heroicons/react/24/solid";

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GlobeAltIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          <h1
            title="Surfer’s Weather"
            className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white"
          >
            Surfer’s Weather
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white transition hover:ring-2 hover:ring-blue-300"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <SunIcon className="w-6 h-6 text-yellow-400" />
          ) : (
            <MoonIcon className="w-6 h-6 text-blue-500" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
