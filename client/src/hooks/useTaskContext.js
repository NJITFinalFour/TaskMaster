import { ApperalContext } from "../context/ApperalContext";
import { useContext } from "react";

export const useApperalContext = () => {
  const context = useContext(ApperalContext);

  if (!context) {
    throw Error("ApparelContext must be used inside an WorkoutsContextProvider");
  }

  return context;
};
