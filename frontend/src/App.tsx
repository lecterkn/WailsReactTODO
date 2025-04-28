import "./App.css";
import { TodoTab } from "./components/todo/todo_tab";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:text-white dark:bg-gray-900 py-10 transition-all duration-300">
      <TodoTab />
    </div>
  );
}

export default App;
