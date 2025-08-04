import type { FC } from "react";

interface SearchBarProps {
  theme: string;
}

const SearchBar: FC<SearchBarProps> = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-md shadow p-4 ${
        isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <input
        type="text"
        placeholder="Search for location"
        className={`w-full px-4 py-2 rounded-md border ${
          isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-800"
        } border-gray-300`}
      />
    </div>
  );
};

export default SearchBar;
