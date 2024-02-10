// import { useState } from "react";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

interface ApiData {
  createdAt: Date;
  load: number;
  reps: number;
  title: string;
  updatedAt: Date;
  __v: number;
  _id: string;
}

const App: React.FC = () => {
  const [allWorkouts, setAllWorkouts] = useState<ApiData[]>();

  useEffect(() => {
    const apiCall = async () => {
      try {
        const response = await axios.get("http://localhost:4000/workouts");
        console.log(response.data);
        if (response.data) {
          setAllWorkouts(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    apiCall();
  }, []);

  return (
    <>
      <div className="app">
        <header className="bg-gray-50">
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Welcome Back, Barry!
                </h1>

                <p className="mt-1.5 text-sm text-gray-500">
                  Let's write a new blog post! 🎉
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                <button
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring"
                  type="button"
                >
                  <span className="text-sm font-medium"> View Website </span>
                </button>

                <button
                  className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                  type="button"
                >
                  Create Post
                </button>
              </div>
            </div>
          </div>
        </header>
        <ul>
          {allWorkouts &&
            allWorkouts.map((item) => (
              <li key={item._id}>
                {item.title} || {item.reps} || {item.load}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default App;
