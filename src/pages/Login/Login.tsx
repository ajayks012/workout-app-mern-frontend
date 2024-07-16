import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { useLogin } from "@/hooks/useLogin";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const { login, loading, error } = useLogin();

  const handleSubmit = async () => {
    const formData = {
      email,
      password,
    };
    login(formData);
    if (!error) {
      navigate("/");
    }
  };

  return (
    <>
      <LoadingComponent loading={loading} />
      <div className=" h-full w-full flex items-center justify-center">
        <div className="card bg-base-100 shadow-xl flex flex-col w-3/6 h-fit m-2">
          <div className=" form-control m-4 p-3 flex gap-2 ">
            <div className=" flex justify-between">
              <label htmlFor="name">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className=" flex justify-between">
              <label htmlFor="name">Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="flex w-full flex-row justify-between items-center">
              <Link className=" link-primary underline" to="/signup">
                Signup
              </Link>
              <button className=" btn btn-primary" onClick={handleSubmit}>
                Login
              </button>
            </div>
            {error && (
              <div className=" m-1 p-2 bg-red-300">
                <p className=" text-red-600">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
