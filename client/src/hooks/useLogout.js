import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
// import { useApperalContext } from "../hooks/useApperalContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  // const { dispatch: dispatchApperal } = useApperalContext();
  const navigate = useNavigate();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");
    navigate("/");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    // dispatchApperal({ type: "SET_APPERAL", payload: null });
  };

  return { logout };
};
