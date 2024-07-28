import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:4000/auth/logout",
        withCredentials: true,
      });
      if (response && response.data) {
        localStorage.removeItem("user");
        delete axiosInstance.defaults.headers.common["Authorization"];

        dispatch({ type: "LOGOUT" });
        setLoading(false);
        navigate("/login");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError(err.response.data.error);
    }
  };
  return { logout, loading, error };
};
