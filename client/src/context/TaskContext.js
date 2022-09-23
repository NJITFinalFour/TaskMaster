import { createContext, useReducer } from "react";

export const TaskContext = createContext();

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_Task":
      return {
        task: action.payload,
      };
    case "CREATE_Task":
      return {
        task: [action.payload, ...state.task],
      };
    case "DELETE_Task":
      return {
        task: state.task.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    task: null,
  });

  return <TaskContext.Provider value={{ ...state, dispatch }}>{children}</TaskContext.Provider>;
};
