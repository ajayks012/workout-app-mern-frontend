import { useCallback, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import TestPage from "./TestPage";
import { dateFormatter } from "@/lib/utils";
import axios from "axios";
import "./react-calendar.css";
import { workout } from "@/types/types";
import WorkoutTable from "@/components/WorkoutTable";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { useAuthContext } from "@/hooks/useAuthContext";

const Home = () => {
  const [workouts, setWorkouts] = useState<workout[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
  const { user } = useAuthContext();

  const fetchWorkouts = useCallback(async (selectedDate?: Date | null) => {
    const date = selectedDate ? selectedDate : new Date();
    setLoadingFlag(true);
    if (date) {
      try {
        const formattedDate = dateFormatter(date);
        let reqOptions = {
          url:
            "http://localhost:4000/workouts/filter" + `?date=${formattedDate}`,
          method: "GET",
        };
        const res = await axios.request(reqOptions);
        console.log(res.data);
        setWorkouts(res.data);

        setLoadingFlag(false);
      } catch (err) {
        console.log(err);
        setWorkouts([]);
        setLoadingFlag(false);
      }
    } else {
      try {
        const res = await axios({
          method: "GET",
          url: "http://localhost:4000/workouts",
        });
        console.log(res.data);
        setLoadingFlag(false);
      } catch (err) {
        console.log(err);
        setWorkouts([]);
        setLoadingFlag(false);
      }
    }
  }, []);

  const fetchApi = useCallback(async (selectedDate) => {
    try {
      const params = {};
      if (selectedDate) params.date = dateFormatter(selectedDate);
      const response = await axios({
        method: "GET",
        url: "http://localhost:4000/workout/" + user._id,
        params,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
      setWorkouts(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchApi();
  }, []);

  const handleDelete = useCallback(async (id: String) => {
    setLoadingFlag(true);

    try {
      const apiUrl = "http://localhost:4000/workouts/" + id;
      const res = await axios({
        method: "DELETE",
        url: apiUrl,
      });
      console.log(res.data);
      fetchWorkouts(selectedDate);
      setLoadingFlag(false);
    } catch (err) {
      console.log(err);
      setLoadingFlag(false);
    }
  }, []);

  const handleDateChange = (date: Date) => {
    setSelectedDate((prevState: Date) => {
      if (prevState.toDateString() !== date.toDateString()) {
        return date;
      } else {
        return prevState;
      }
    });
    fetchApi(date);
    return date;
  };

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
          <WorkoutTable content={workouts} deleteFunction={handleDelete} />
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
