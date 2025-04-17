import { TodoAddPanel } from "./todo_add_panel";

export const TodoTab = () => {
  return (
    <div className="container mx-auto p-4 max-w-md bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        My Todo List
      </h1>
      <TodoAddPanel />
    </div>
  );
};
