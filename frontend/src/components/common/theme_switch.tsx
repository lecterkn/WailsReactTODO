import { useEffect, useState } from "react";
import {
  GetSettings,
  SetDarkTheme,
} from "../../../wailsjs/go/usecase/SettingsUsecase";

const toggleTheme = (isDark: boolean) => {
  const html = document.documentElement;
  if (isDark) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
};

const ThemeSwitch = () => {
  const [isDark, setIsDark] = useState(false);
  const setTheme = (isDark: boolean) => {
    SetDarkTheme(isDark).then(() => {
      setIsDark(isDark);
      toggleTheme(isDark);
    });
  };

  useEffect(() => {
    GetSettings().then((output) => {
      setIsDark(output.isDarkTheme);
      toggleTheme(output.isDarkTheme);
    });
  }, []);
  return (
    // <button
    //   onClick={toggleTheme}
    //   className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 transition"
    // >
    //   {isDark ? "🌙" : "☀️"}
    // </button>
    <button
      onClick={() => setTheme(!isDark)}
      className="px-4 py-2 bg-blue-600 hover:bg-gradient-to-r from-blue-500 to-blue-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 transition-colors duration-300"
    >
      {isDark ? "ダークテーマ" : "ライトテーマ"}
    </button>
  );
};

export default ThemeSwitch;
