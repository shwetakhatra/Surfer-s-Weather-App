import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import { getWeatherStyles } from "./utils/getWeatherStyles";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [weather, setWeather] = useState("clear");

  const getWeatherCondition = (code: number): string => {
    if ([0].includes(code)) return "clear";
    if ([1, 2, 3].includes(code)) return "clouds";
    if ([45, 48].includes(code)) return "fog";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "rain";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
    if ([95, 96, 99].includes(code)) return "storm";
    return "clear";
  };

  useEffect(() => {
    document.body.className = theme === "dark" ? "theme-dark" : "theme-light";
  }, [theme]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!navigator.geolocation) {
        console.warn("Geolocation not supported.");
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          const code = data.current_weather.weathercode;
          const condition = getWeatherCondition(code);
          setWeather(condition);
        } catch (err) {
          console.error("Error fetching weather:", err);
        }
      });
    };

    fetchWeather();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const { bg, text } = getWeatherStyles(weather, theme);

  return (
    <div className={`flex flex-col min-h-screen ${bg} ${text}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow p-4">
        <Dashboard theme={theme} />
      </main>
      <Footer theme={theme} />
    </div>
  );
}

export default App;
