/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState } from "react";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";

// eslint-disable-next-line react/prop-types
const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/todos/${task.id}`,
        {
          method: "DELETE",
        }
      );
      if (res.status === 200) {
        getData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full m-2 rounded-xl border-2 border-gray-300 shadow-xl flex justify-between">
      <div className="flex p-2 items-center">
        <TickIcon className=" p-2" />
        <p className="mx-4 w-[18rem]">{task.title}</p>
        <ProgressBar task={task} />
      </div>

      <div className="flex justify-center p-2">
        <button
          className=" transition-color mr-2 fill-transparent uppercase border-[#8db591] border-2 p-2 rounded-xl text-[#8db591] hover:bg-[#b6dfba] focus:text-white"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Edit
        </button>
        <button
          className="transition-color mr-2 fill-transparent uppercase border-[#ffafa3] border-2 p-2 rounded-xl text-[#ffafa3] hover:bg-[#ffc9c1] focus:text-white"
          onClick={deleteItem}
        >
          Delete
        </button>
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          task={task}
          getData={getData}
        />
      )}
    </div>
  );
};

export default ListItem;
