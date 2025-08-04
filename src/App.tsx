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
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main
        className={`min-h-screen w-full p-4 transition-colors
        ${theme === "dark" ? "bg-[#242424] text-white" : "bg-white text-gray-800"}`}
      >
        <p>Current theme: {theme}</p>
      </main>
      <Footer />
    </>
  );
}

export default App;
