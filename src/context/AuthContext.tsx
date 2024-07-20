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
  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("email")) || "";
    const token = JSON.parse(localStorage.getItem("token")) || "";
    if (email && token) {
      console.log(email, token);
      dispatch({ type: "LOGIN", payload: { email, token } });
    }
  }, []);

  console.log("auth state", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
