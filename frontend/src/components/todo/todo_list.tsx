import { useEffect, useState } from "react";
import { TodoItem } from "../../models/todo";
import { useTodoStore } from "../../stores/todo_store";
import { TodoListItem } from "../todo/todo_list_item";

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
  const fetchTodoList = useTodoStore((state) => state.fetchTodoItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  useEffect(() => {
    fetchTodoList();
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
