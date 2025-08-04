export const getWeatherStyles = (
  weather: string,
  theme: "light" | "dark",
): { bg: string; text: string } => {
  switch (weather.toLowerCase()) {
    case "clear":
      return {
        bg: "bg-gradient-to-br from-yellow-100 via-blue-300 to-blue-500",
        text: "text-gray-900",
      };
    case "clouds":
      return {
        bg: "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500",
        text: "text-gray-800",
      };
    case "rain":
      return {
        bg: "bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900",
        text: "text-white",
      };
    case "snow":
      return {
        bg: "bg-gradient-to-br from-white via-blue-100 to-blue-200",
        text: "text-gray-700",
      };
    case "fog":
      return {
        bg: "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400",
        text: "text-gray-900",
      };
    case "storm":
      return {
        bg: "bg-gradient-to-tr from-gray-800 via-gray-900 to-black",
        text: "text-white",
      };
    default:
      return theme === "dark"
        ? {
            bg: "bg-gradient-to-br from-[#1c1c1c] via-[#242424] to-[#333]",
            text: "text-white",
          }
        : {
            bg: "bg-gradient-to-br from-white via-gray-100 to-gray-200",
            text: "text-gray-800",
          };
  }
};
