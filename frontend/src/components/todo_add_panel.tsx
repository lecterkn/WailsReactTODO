import { useState } from "react";

export const TodoAddPanel = () => {
  const [value, setValue] = useState("");
  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Add a new todo..."
        value={value}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline">
        Add
      </button>
    </div>
  );
};
