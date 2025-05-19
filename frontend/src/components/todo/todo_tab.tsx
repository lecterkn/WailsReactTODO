import ThemeSwitch from "../common/theme_switch";
import { TodoAddPanel } from "./todo_add_panel";
import { TodoList } from "./todo_list";

export const TodoTab = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden transition-all duration-300">
      <div className="px-16 py-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold ">Todo アプリ</h1>
          <ThemeSwitch />
        </div>
        <TodoAddPanel />
        <TodoList />
      </div>
    </div>
  );
};
