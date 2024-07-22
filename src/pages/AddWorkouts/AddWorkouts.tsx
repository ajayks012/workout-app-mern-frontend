import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import Modal from "@/components/Modal/Modal";
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
  const [loader, setLoader] = useState(false);
  const [modalStatus, setModalStatus] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");

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

  const resetInputs = () => {
    setWorkoutName("");
    setSets([defaultSetsObj]);
  };

  const handleSubmit = async () => {
    setLoader(true);
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
      resetInputs();
      setModalStatus("success");
      setModalTitle("Success");
      setModalDescription("Workout Created Successfully");
      document.getElementById("my_modal_3").showModal();
      setLoader(false);
    } catch (err) {
      console.log(err);
      setModalStatus("error");
      setModalTitle("Error");
      setModalDescription("Workout Creation Failed");
      setLoader(false);
    }
  };

  const closeModal = () => {
    setModalStatus("");
    setModalTitle("");
    setModalDescription("");
  };

  return (
    <>
      <LoadingComponent loading={loader} />
      <Modal
        onClose={closeModal}
        status={modalStatus}
        title={modalTitle}
        description={modalDescription}
      />
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              // onClick={onClose}
            >
              ✕
            </button>
          </form>
          <h3 className={`font-bold text-lg text-${modalStatus}`}>
            {modalTitle}
          </h3>
          <p className="py-4">{modalDescription}</p>
        </div>
      </dialog>
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
