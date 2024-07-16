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
            <th className="w-5/12 text-sm">Title</th>
            <th className="w-2/12 text-sm">Load(in KG)</th>
            <th className="w-2/12 text-sm">Reps</th>
            <th className="w-2/12"></th>
          </tr>
        </thead>
        <tbody>
          {content.length > 0 ? (
            content.map((item: workout, index: number) => {
              return (
                <tr key={item._id} className="p-10 hover:bg-primary-content">
                  <td className="w-1/12 text-center">{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.load}</td>
                  <td>{item.reps}</td>
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
};

export default WorkoutTable;
