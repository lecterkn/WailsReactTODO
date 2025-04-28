import { useState } from "react";
import {
  UncompleteTask,
  CompleteTask,
  UpdateTitle,
  DeleteTask,
} from "../../../wailsjs/go/usecase/TaskUsecase";
import { TodoItem } from "../../models/todo";
import { useTodoStore } from "../../stores/todo_store";

interface Props {
  item: TodoItem;
  isEditing: boolean;
  setEditing: (editing: boolean) => void;
}

export const TodoListItem = ({ item, isEditing, setEditing }: Props) => {
  const [text, setText] = useState(item.title);
  const setTodoList = useTodoStore((state) => state.setTodoItem);
  const fetchTodoList = useTodoStore((state) => state.fetchTodoItems);
  const setTitle = (title: string) => {
    UpdateTitle(item.id, {
      Title: text,
    }).then(() => {
      fetchTodoList();
    });
    setEditing(false);
  };
  const setCompleted = (completed: boolean) => {
    if (completed) {
      CompleteTask(item.id).then(() => {
        fetchTodoList();
      });
    } else {
      UncompleteTask(item.id).then(() => {
        fetchTodoList();
      });
    }
  };
  const deleteItem = () => {
    DeleteTask(item.id).then(() => {
      fetchTodoList();
    });
  };
  return isEditing ? (
    <div className="flex items-center justify-between duration-300">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="py-2 px-3 w-full shadow appearance-none border rounded text-gray-700 dark:text-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline transition-colors "
      />
      <button
        onClick={() => {
          setTitle(text);
        }}
        className="ml-2 py-2 px-4 w-[100px] border-transparent bg-green-500 hover:bg-green-700 text-white font-bold rounded focus:outline-none focus:shadow-outline transition-colors "
      >
        保存
      </button>
      <button
        onClick={() => setEditing(false)}
        className="ml-2 py-2 px-4 w-[180px] border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500  dark:hover:bg-blue-500 text-gray-800 dark:text-white font-bold rounded focus:outline-none focus:shadow-outline transition-colors "
      >
        キャンセル
      </button>
    </div>
  ) : (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => setCompleted(!item.completed)}
          className="mr-2 leading-tight accent-blue-500"
        />
        <span
          className={
            item.completed
              ? "line-through dark:text-gray-400"
              : "dark:text-white"
          }
        >
          {item.title}
        </span>
      </div>
      <div>
        <button
          onClick={() => setEditing(true)}
          className="mr-2 bg-yellow-500 hover:bg-yellow-700 border-transparent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors "
        >
          編集
        </button>
        <button
          onClick={() => deleteItem()}
          className="bg-red-500 hover:bg-red-700 border-transparent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors "
        >
          削除
        </button>
      </div>
    </div>
  );
};
