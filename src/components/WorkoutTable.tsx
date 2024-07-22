import { workout } from "@/types/types";
import React from "react";

import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

interface tableProps {
  content: workout[];
  deleteFunction: (id: String) => Promise<void>;
}

const WorkoutTable: React.FC<tableProps> = ({ content, deleteFunction }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table border-2 border-primary ">
        {/* head */}
        <thead>
          <tr className="bg-primary text-primary-content">
            <th className="w-1/12 text-center"></th>
            <th className="w-5/12 text-sm">Workout</th>
            <th className="w-2/12 text-sm text-center" colSpan={2}>
              Sets
            </th>
            <th className="w-2/12"></th>
          </tr>
          <tr className="bg-primary text-primary-content">
            <th></th>
            <th></th>
            <th className="text-center">Reps</th>
            <th className="text-center">Weight</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {content.length > 0 ? (
            content.map((exercise, exerciseIndex) => (
              <React.Fragment key={exercise._id}>
                <tr>
                  <td
                    className="w-1/12 text-center align-top"
                    rowSpan={exercise?.sets.length}
                  >
                    {exerciseIndex + 1}
                  </td>
                  {/* Exercise cell with rowspan */}
                  <td
                    rowSpan={exercise.sets.length}
                    style={{ verticalAlign: "top" }}
                  >
                    {exercise.exercise}
                  </td>
                  {/* First set */}
                  <td className="text-center">{exercise.sets[0].reps}</td>
                  <td className="text-center">{exercise.sets[0].weight}</td>
                  <td>
                    <div className="inline-flex w-full justify-evenly">
                      <span className="link tooltip" data-tip="Edit">
                        <MdEdit className="text-lg" />
                      </span>
                      <span
                        className="link tooltip"
                        data-tip="Delete"
                        // onClick={() => deleteFunction(item._id)}
                      >
                        <MdDeleteOutline className="text-lg" />
                      </span>
                    </div>
                  </td>
                </tr>
                {/* Additional sets */}
                {exercise.sets.slice(1).map((set, setIndex) => (
                  <tr key={`${exercise._id}-${setIndex}`}>
                    <td className="text-center">{set.reps}</td>
                    <td className="text-center">{set.weight}</td>
                    <td>
                      <div className="inline-flex w-full justify-evenly">
                        <span className="link tooltip" data-tip="Edit">
                          <MdEdit className="text-lg" />
                        </span>
                        <span
                          className="link tooltip"
                          data-tip="Delete"
                          onClick={() => deleteFunction(item._id)}
                        >
                          <MdDeleteOutline className="text-lg" />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={5} className=" text-center">
                No data to show
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutTable;
