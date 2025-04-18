import { useState } from "react";

export const TodoAddPanel = () => {
  const [value, setValue] = useState("");
  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Add a new todo..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md">
        Add
      </button>
    </div>
  );
};
