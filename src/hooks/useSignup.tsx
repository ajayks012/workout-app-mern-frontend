import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (payload: object) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:4000/signup",
        data: payload,
        headers: { "Content-Type": "application/json" },
      });
      if (response && response.data) {
        localStorage.setItem("email", JSON.stringify(response.data.email));
        localStorage.setItem("token", JSON.stringify(response.data.token));

        //update auth context
        dispatch({ type: "LOGIN", payload: response.data });
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      setError(err.response.data.error);
    }
  };
  return { signup, loading, error };
};
