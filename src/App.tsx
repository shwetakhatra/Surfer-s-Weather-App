import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import { getWeatherStyles } from "./utils/getWeatherStyles";

function App() {
  const [theme] = useState<"light" | "dark">("dark");
  const [weather, setWeather] = useState("clear");

  const { bg, text } = getWeatherStyles(weather, theme);
  const textShadowClass = "text-shadow-lg";

  return (
    <div className={`relative flex flex-col min-h-screen ${bg}`}>
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            theme === "dark" ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.36)",
        }}
      />
      <div className={`relative z-10 ${text} ${textShadowClass}`}>
        <Header theme={theme} />
        <main className="flex-grow p-4">
          <Dashboard theme={theme} setWeather={setWeather} />
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
