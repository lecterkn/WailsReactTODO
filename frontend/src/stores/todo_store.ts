import { create } from "zustand";
import { TodoItem } from "../models/todo";

export interface TodoStore {
  todoItems: TodoItem[];
  setTodoItem: (items: TodoItem[]) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todoItems: [],
  setTodoItem: (items) => {
    set((state) => ({ todoItems: items }));
  },
}));
