import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:4000/auth/login",
        data: payload,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response && response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        //update auth context
        dispatch({ type: "LOGIN", payload: response.data });
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError(err.response.data.error);
    }
  };
  return { login, loading, error };
};
