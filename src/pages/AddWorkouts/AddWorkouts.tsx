import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { useAuthContext } from "@/hooks/useAuthContext";
import axios from "axios";
import { useState } from "react";

const AddWorkouts = () => {
  const defaultSetsObj = {
    reps: 0,
    weight: 0,
  };

  const [workoutName, setWorkoutName] = useState("");
  const [sets, setSets] = useState([defaultSetsObj]);

  const { user } = useAuthContext();

  const addSets = () => {
    setSets((prevState: Array) => {
      return [...prevState, defaultSetsObj];
    });
  };

  const handleInputChange = (key, value, index) => {
    setSets((prevState) => {
      return prevState.map((set, idx) => {
        if (idx === index) {
          return {
            ...set,
            [key]: parseInt(value) || 0,
          };
        } else {
          return set;
        }
      });
    });
  };

  const handleSubmit = async () => {
    const payload = {
      userId: user._id,
      workouts: {
        exercise: workoutName,
        sets: sets,
      },
    };
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:4000/workout/create",
        data: payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <LoadingComponent loading={false} />
      <div className=" h-full w-full flex items-center justify-center">
        <div className="card w-5/6 bg-base-100 shadow-xl flex flex-col h-fit m-2">
          <div className=" form-control m-4 p-3 flex gap-2 ">
            <div className="flex flex-row">
              <div className=" flex flex-col justify-between ">
                <label htmlFor="name">Workout Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                />
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>
                          <button
                            className=" btn btn-sm btn-info rounded-full"
                            onClick={() => addSets()}
                          >
                            +
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sets?.map((set, idx) => (
                        <tr key={idx}>
                          <td>{idx}</td>
                          <td>
                            <input
                              type="text"
                              className="input input-bordered"
                              value={set.reps}
                              onChange={(e) =>
                                handleInputChange("reps", e.target.value, idx)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input input-bordered"
                              value={set.weight}
                              onChange={(e) =>
                                handleInputChange("weight", e.target.value, idx)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-row justify-between items-center">
              <button className=" btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            {/* {error && (
              <div className=" m-1 p-2 bg-red-300">
                <p className=" text-red-600">{error}</p>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWorkouts;
