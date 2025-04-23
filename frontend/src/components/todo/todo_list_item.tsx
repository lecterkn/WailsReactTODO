import { useState } from "react";
import {
  GetTasks,
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
  const setTitle = (title: string) => {
    UpdateTitle(item.id, {
      Title: text,
    }).then(() => {
      updateTodoList();
    });
    setEditing(false);
  };
  const setCompleted = (completed: boolean) => {
    if (completed) {
      CompleteTask(item.id).then(() => {
        updateTodoList();
      });
    } else {
      UncompleteTask(item.id).then(() => {
        updateTodoList();
      });
    }
  };
  const deleteItem = () => {
    DeleteTask(item.id).then(() => {
      updateTodoList();
    });
  };
  return isEditing ? (
    <div className="flex items-center justify-between">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="py-2 px-3 w-full shadow appearance-none border rounded text-gray-700 dark:text-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        onClick={() => {
          setTitle(text);
        }}
        className="ml-2 py-2 px-4 w-[100px] bg-green-500 hover:bg-green-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
      >
        保存
      </button>
      <button
        onClick={() => setEditing(false)}
        className="ml-2 py-2 px-4 w-[160px] bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-bold rounded focus:outline-none focus:shadow-outline"
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
          className="mr-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          編集
        </button>
        <button
          onClick={() => deleteItem()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          削除
        </button>
      </div>
    </div>
  );
};
