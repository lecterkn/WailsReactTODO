import { useEffect, useState } from "react";

const toggleTheme = () => {
  const html = document.documentElement;
  html.classList.toggle("dark");
};

const ThemeSwitch = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDark(); // 初回チェック

    // MutationObserverを使って動的な変化を監視する
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);
  return (
    // <button
    //   onClick={toggleTheme}
    //   className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 transition"
    // >
    //   {isDark ? "🌙" : "☀️"}
    // </button>
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
    >
      {isDark ? "ダークテーマ" : "ライトテーマ"}
    </button>
  );
};

export default ThemeSwitch;
