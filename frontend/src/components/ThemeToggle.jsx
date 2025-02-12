import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") !== "light" // Defaults to dark mode
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-800 text-white dark:bg-white dark:text-black transition-all"
    >
      {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
