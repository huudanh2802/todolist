import { useState } from "react";

export const useAddTask = () => {
  const [newTask, setNewTask] = useState("");
  return [{ newTask, setNewTask }];
};
