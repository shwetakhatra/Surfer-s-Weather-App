import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import { getWeatherStyles } from "./utils/getWeatherStyles";

interface City {
  id: number;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface Weather {
  temperature: number;
  windspeed: number;
  weathercode: number;
  // add more if needed
}

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [weather, setWeather] = useState("clear");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);

  const getWeatherCondition = (code: number): string => {
    if ([0].includes(code)) return "clear";
    if ([1, 2, 3].includes(code)) return "clouds";
    if ([45, 48].includes(code)) return "fog";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "rain";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
    if ([95, 96, 99].includes(code)) return "storm";
    return "clear";
  };

  const fetchWeatherByCoords = async (latitude: number, longitude: number) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCurrentWeather(data.current_weather);
      const code = data.current_weather.weathercode;
      const condition = getWeatherCondition(code);
      setWeather(condition);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  useEffect(() => {
    document.body.className = theme === "dark" ? "theme-dark" : "theme-light";
  }, [theme]);

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherByCoords(selectedCity.latitude, selectedCity.longitude);
    } else {
      if (!navigator.geolocation) {
        console.warn("Geolocation not supported.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude,
          );
        },
        (err) => {
          console.error("Geolocation error:", err);
        },
      );
    }
  }, [selectedCity]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const { bg, text } = getWeatherStyles(weather, theme);

  const textShadowClass = "text-shadow-lg";

  return (
    <div className={`relative flex flex-col min-h-screen ${bg}`}>
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            theme === "dark"
              ? "rgba(0,0,0,0.45)"
              : "rgba(255,255,255,0.36)", 
        }}
      />
      <div className={`relative z-10 ${text} ${textShadowClass}`}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-grow p-4">
          <Dashboard theme={theme} onSelectCity={setSelectedCity} />
        </main>
        <Footer theme={theme} />
      </div>
      <style>{`
        .text-shadow-lg {
          text-shadow: 0 2px 6px rgba(0,0,0,0.22), 0 1px 2px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
}

export default App;