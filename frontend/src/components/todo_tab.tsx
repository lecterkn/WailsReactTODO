import { useEffect, useState } from "react";
import { TodoAddPanel } from "./todo_add_panel";
import { TodoList } from "./todo_list";

const toggleTheme = () => {
  const html = document.documentElement;
  html.classList.toggle("dark");
};

export const TodoTab = () => {
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
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold dark:text-white">Todo App</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
          >
            {isDark ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
        <TodoAddPanel />
        <TodoList />
      </div>
    </div>
  );
};
