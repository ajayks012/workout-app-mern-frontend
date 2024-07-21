import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state: Object, action: Object) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  const handleRefresh = async () => {
    if (state && state.user === null) {
      try {
        const response = await axios({
          method: "GET",
          url: "http://localhost:4000/auth/refresh",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        const { _id, name, email, token } = response.data;
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: "LOGIN", payload: { _id, name, email, token } });
      } catch (err) {
        console.log(err);
      }
    }
    // const user = JSON.parse(localStorage.getItem("user")) || "";
    // if (user.email && user.token) {
    //   dispatch({ type: "LOGIN", payload: { ...user } });
    // }
  };
  useEffect(() => {
    handleRefresh();
  }, []);

  console.log("auth state", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
