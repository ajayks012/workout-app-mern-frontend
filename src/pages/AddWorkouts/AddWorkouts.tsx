import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { useState } from "react";

const AddWorkouts = () => {
  const defaultSetsObj = {
    reps: 0,
    weight: 0,
  };
  const defaultObj = {
    exercise: "",
    sets: [defaultSetsObj],
  };
  const [workouts, setWorkouts] = useState([defaultObj]);

  const addWorkout = () => {
    setWorkouts((prevState) => {
      return [...prevState, defaultObj];
    });
  };

  const addSets = (index: number) => {
    setWorkouts((prevState: Array) => {
      return prevState?.map((workout: object, idx: number) => {
        if (idx === index) {
          return {
            ...workout,
            sets: [...workout.sets, defaultSetsObj],
          };
        } else {
          return workout;
        }
      });
    });
  };

  return (
    <>
      <LoadingComponent loading={false} />
      <div className=" h-full w-full flex items-center justify-center">
        <div className="card bg-base-100 shadow-xl flex flex-col w-3/6 h-fit m-2">
          <div className=" form-control m-4 p-3 flex gap-2 ">
            <div className="flex flex-row">
              {workouts.map((workout, index) => {
                return (
                  <div className=" flex flex-col justify-between ">
                    <label htmlFor="name">Workout Name</label>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={workout.exercise}
                    />
                    {workout?.sets?.map((set, idx) => {
                      return (
                        <div className="flex flex-row">
                          <div className=" flex flex-col justify-between ">
                            <label htmlFor="reps">Reps</label>
                            <input
                              type="text"
                              className="input input-bordered w-full max-w-xs"
                              value={set.reps}
                            />
                          </div>
                          <div className=" flex flex-col justify-between ">
                            <label htmlFor="weight">Weight</label>
                            <input
                              type="text"
                              className="input input-bordered w-full "
                              value={set.weight}
                            />
                          </div>
                          {idx === 0 && (
                            <button
                              className=" btn btn-secondary"
                              onClick={() => addSets(index)}
                            >
                              +Set
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="flex w-full flex-row justify-between items-center">
              <button
                className=" btn btn-primary"
                // onClick={handleSubmit}
              >
                Signup
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
