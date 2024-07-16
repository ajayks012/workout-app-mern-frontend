import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { useSignup } from "@/hooks/useSignup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<Number>(0);
  const navigate = useNavigate();

  const { signup, loading, error } = useSignup();

  const handleSubmit = () => {
    const formData = {
      email,
      password,
      name,
      age,
    };
    signup(formData);
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
            <div className=" flex justify-between ">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
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
              <label htmlFor="name">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
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
              <Link className=" link-primary underline" to="/login">
                Login
              </Link>
              <button className=" btn btn-primary" onClick={handleSubmit}>
                Signup
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

export default Signup;
