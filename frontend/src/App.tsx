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

function OldApp() {
  const [resultText, setResultText] = useState(
    "Please enter your name below 👇",
  );
  const [name, setName] = useState("");
  const updateName = (e: any) => setName(e.target.value);
  const updateResultText = (result: string) => setResultText(result);

  function greet() {
    Greet(name).then(updateResultText);
  }

  return (
    <div className="min-h-screen bg-red-400">
      <div id="result" className="result text-black">
        {resultText}
      </div>
      <div className="bg-red-500 p-4">Hello</div>
      <div id="input" className="input-box">
        <input
          id="name"
          className="input bg-slate-100 text-black"
          onChange={updateName}
          autoComplete="off"
          name="input"
          type="text"
        />
        <button className="btn font-bold text-lg" onClick={greet}>
          Greet
        </button>
      </div>
    </div>
  );
}

export default App;
