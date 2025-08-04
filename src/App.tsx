import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme === "dark" ? "theme-dark" : "theme-light";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${theme === "dark" ? "bg-[#242424] text-white" : "bg-white text-gray-800"}`}
    >
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow p-4">
        <p>Current theme: {theme}</p>
      </main>
      <Footer theme={theme} />
    </div>
  );
}

export default App;
