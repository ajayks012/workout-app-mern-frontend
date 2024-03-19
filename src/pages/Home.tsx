import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import TestPage from "./TestPage";
import { dateFormatter } from "@/lib/utils";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import "./react-calendar.css";

type workout = {
  date: Date;
  load: number;
  reps: number;
  title: string;
  __v: number;
  _id: string;
};

const Home = () => {
  const [workouts, setWorkouts] = useState<workout[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const fetchWorkouts = async (date?: Date) => {
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
      } catch (err) {
        console.log(err);
        setWorkouts([]);
      }
    } else {
      try {
        const res = await axios({
          method: "GET",
          url: "http://localhost:4000/workouts",
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
        setWorkouts([]);
      }
    }
  };

  useEffect(() => {
    const date = selectedDate ? selectedDate : new Date();
    fetchWorkouts(date);
  }, [selectedDate]);

  const table = (
    <div className="overflow-x-auto">
      <table className="table border-2 border-primary ">
        {/* head */}
        <thead>
          <tr className="bg-primary text-black">
            <th className="w-1/12 text-center"></th>
            <th className="w-6/12 text-sm">Title</th>
            <th className="w-2/12 text-sm">Load(in KG)</th>
            <th className="w-2/12 text-sm">Reps</th>
            <th className="w-1/12"></th>
          </tr>
        </thead>
        <tbody>
          {workouts.length > 0 ? (
            workouts.map((item: workout, index: number) => {
              return (
                <tr key={item._id} className="p-10 hover:bg-primary-content">
                  <td className="w-1/12 text-center">{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.load}</td>
                  <td>{item.reps}</td>
                  <td>
                    <div className="link">
                      <MdEdit className="text-lg" />
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No data to display
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex flex-wrap p-5 justify-around">
      <div className="container text-primary p-3 ml-3 font-bold text-lg">
        <h1>
          My Workouts -{" "}
          {selectedDate
            ? dateFormatter(selectedDate)
            : dateFormatter(new Date())}
        </h1>
      </div>
      <div className="grow p-2">{table}</div>
      <div className="flex-none p-2">
        <Calendar
          className="text-primary bg-primary-content border-primary rounded-lg shadow-md"
          value={selectedDate}
          onChange={(e: any) => setSelectedDate(e)}
        />
      </div>
    </div>
  );
};

export default Home;
