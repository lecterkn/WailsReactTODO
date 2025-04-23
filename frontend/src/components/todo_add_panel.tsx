import { useState } from "react";
import { GetTasks, CreateTask } from "../../wailsjs/go/usecase/TaskUsecase";
import { TodoItem } from "../models/todo";
import { useTodoStore } from "../stores/todo_store";

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
    <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder="タスク名を入力してください..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        onClick={addTodo}
        className="ml-4 py-2 px-4 w-[80px] bg-blue-500 hover:bg-blue-700 text-white font-bold rounded shadow-md"
      >
        追加
      </button>
    </div>
  );
};
