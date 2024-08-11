import { useCallback, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import TestPage from "./TestPage";
import { dateFormatter } from "@/lib/utils";
import axios from "axios";
import "./react-calendar.css";
import WorkoutTable from "@/components/WorkoutTable/WorkoutTable";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { useAuthContext } from "@/hooks/useAuthContext";
import axiosInstance from "../api/apiHandler";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [workoutData, setWorkoutData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loadingFlag, setLoadingFlag] = useState(false);
  const { user } = useAuthContext();

  const navigate = useNavigate()

  const fetchApi = useCallback(async (selectedDate) => {
    try {
      const params = {};
      console.log(selectedDate);
      if (selectedDate) params.date = dateFormatter(selectedDate);
      const response = await axiosInstance.get(`/workout/${user._id}`, {
        params,
      });
      setWorkoutData(response.data)
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchApi();
  }, []);

  const handleDelete = useCallback(async (workoutId) => {
    setLoadingFlag(true);
    try {
      // const apiUrl = "http://localhost:4000/workout/" + id;
      // const res = await axios({
      //   method: "DELETE",
      //   url: apiUrl,
      // });

      const res = await axiosInstance.delete(`/workout/${workoutId}`);

      console.log(res.data);
      fetchApi(selectedDate);
      setLoadingFlag(false);
    } catch (err) {
      console.log(err);
      setLoadingFlag(false);
    }
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchApi(date);
    return date;
  };

  const handleEdit = (data) => {
    navigate('/add-workout', { state: { _id: workoutData.id, userId: user._id, workout: data } })
  }

  return (
    <div className="container mx-auto">
      <LoadingComponent loading={loadingFlag} />
      <div className="flex flex-wrap p-5 justify-around">
        <div className="container text-primary p-3 ml-3 font-bold text-lg">
          <h1>
            My Workouts -{" "}
            {selectedDate
              ? dateFormatter(selectedDate)
              : dateFormatter(new Date())}
          </h1>
        </div>
        <div className="grow p-2">
          <WorkoutTable content={workoutData.workouts || []} editFunction={handleEdit} deleteFunction={handleDelete} />
        </div>
        <div className="flex-none p-2">
          <Calendar
            className="text-primary bg-primary-content border-primary rounded-lg shadow-md"
            value={selectedDate}
            onChange={handleDateChange} // eslint-disable-line
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
