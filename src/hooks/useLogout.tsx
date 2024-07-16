import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");

    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};
