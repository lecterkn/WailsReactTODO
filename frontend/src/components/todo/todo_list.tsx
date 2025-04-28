import { useEffect, useState } from "react";
import { TodoItem } from "../../models/todo";
import { useTodoStore } from "../../stores/todo_store";
import { TodoListItem } from "../todo/todo_list_item";
import { GetTasks } from "../../../wailsjs/go/usecase/TaskUsecase";

const todo_list: TodoItem[] = [
  {
    id: "1",
    title: "TODOアプリを作成",
    completed: false,
  },
  {
    id: "2",
    title: "コーヒーを買う",
    completed: true,
  },
];

export const TodoList = () => {
  const todoList = useTodoStore((state) => state.todoItems);
  const setTodoList = useTodoStore((state) => state.setTodoItem);
  const [editingId, setEditingId] = useState<string | null>(null);
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
  useEffect(() => {
    updateTodoList();
  }, []);
  return (
    <ul>
      {todoList.map((item) => (
        <>
          <li
            key={item.id}
            className="mb-4 p-4 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-700"
          >
            <TodoListItem
              item={item}
              isEditing={editingId === item.id}
              setEditing={(editing: boolean) => {
                if (editing) {
                  setEditingId(item.id);
                } else {
                  setEditingId(null);
                }
              }}
            />
          </li>
        </>
      ))}
    </ul>
  );
};
