import { create } from "zustand";
import { GetTasks } from "../../wailsjs/go/usecase/TaskUsecase";
import { TodoItem } from "../models/todo";

export interface TodoStore {
  todoItems: TodoItem[];
  setTodoItem: (items: TodoItem[]) => void;
  fetchTodoItems: () => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todoItems: [],
  setTodoItem: (items) => {
    set((state) => ({ todoItems: items }));
  },
  fetchTodoItems: () => {
    GetTasks().then((outputList) => {
      const todoList: TodoItem[] = [];
      outputList.map((output) => {
        todoList.push({
          id: output.Id,
          title: output.Title,
          completed: output.Completed,
        });
      });
      set({ todoItems: todoList });
    });
  },
}));
