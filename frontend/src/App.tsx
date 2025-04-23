import { useState } from "react";
import "./App.css";
import { Greet } from "../wailsjs/go/main/App";
import { TodoTab } from "./components/todo_tab";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:text-white dark:bg-gray-900 py-10">
      <TodoTab />
    </div>
  );
}

export default App;
