import { useState } from "react";

export const TodoAddPanel = () => {
  const [value, setValue] = useState("");
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
      <button className="ml-4 py-2 px-4 w-[80px] bg-blue-500 hover:bg-blue-700 text-white font-bold rounded shadow-md">
        追加
      </button>
    </div>
  );
};
