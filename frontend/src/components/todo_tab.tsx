import ThemeSwitch from "./common/theme_switch";
import { TodoAddPanel } from "./todo_add_panel";
import { TodoList } from "./todo_list";

export const TodoTab = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold dark:text-white">Todo アプリ</h1>
          <ThemeSwitch />
        </div>
        <TodoAddPanel />
        <TodoList />
      </div>
    </div>
  );
};
