import axios from "axios";
import { useEffect, useState } from "react";

type ApiData = {
  createdAt: Date;
  load: number;
  reps: number;
  title: string;
  updatedAt: Date;
  __v: number;
  _id: string;
};

const TestPage = () => {
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
    <div>
      <ul>
        {allWorkouts &&
          allWorkouts.map((item) => (
            <li key={item._id}>
              {item.title} || {item.reps} || {item.load}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TestPage;
