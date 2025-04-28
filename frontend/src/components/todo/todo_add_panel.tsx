import { useState } from "react";
import { GetTasks, CreateTask } from "../../../wailsjs/go/usecase/TaskUsecase";
import { TodoItem } from "../../models/todo";
import { useTodoStore } from "../../stores/todo_store";

export const TodoAddPanel = () => {
  const [value, setValue] = useState("");
  const setTodoList = useTodoStore((state) => state.setTodoItem);
  const updateTodoList = () => {
    GetTasks().then((outputList) => {
      const todoList: TodoItem[] = [];
      outputList.map((output) => {
        todoList.push({
          id: output.Id,
          title: output.Title,
          completed: output.Completed,
        });
      });
      setTodoList(todoList);
    });
  };
  const addTodo = () => {
    CreateTask({
      Title: value,
    }).then((e) => {
      setValue("");
      updateTodoList();
    });
  };
  return (
    <div className="flex items-center mb-4 duration-300">
      <input
        type="text"
        placeholder="タスク名を入力してください..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="py-2 px-3 shadow-md appearance-none border-gray-300 rounded w-full bg-gray-100 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        onClick={addTodo}
        className="ml-4 py-2 px-4 w-[80px] bg-blue-600 hover:bg-blue-700 border-transparent text-white font-bold rounded shadow-md transition-all"
      >
        追加
      </button>
    </div>
  );
};
