import { TasksContext } from "../context/TaskContext";
import { useContext } from "react";

export const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw Error("TasksContext must be used inside a TasksContextProvider");
  }

  return context;
};
