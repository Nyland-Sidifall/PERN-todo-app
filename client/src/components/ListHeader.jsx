import React, { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

// eslint-disable-next-line react/prop-types
const ListHeader = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const signOut = () => {
    removeCookie("sigEmailnout");
    removeCookie("AuthToken");
    window.location.reload();
  };
  return (
    <div className="flex w-[95vw] p-2 justify-between">
      <div className="flex w-full text-3xl mr-4">
        <h1>{listName}</h1>
      </div>
      <div className="flex justify-normal flex-nowrap whitespace-nowrap">
        <button
          className="mr-2 p-2 bg-transparent border-b-2 rounded-xl border-gray-400"
          onClick={() => setShowModal(true)}
        >
          Add New
        </button>
        <button
          className="m-0 p-2 bg-transparent border-b-2 rounded-xl border-gray-400"
          onClick={signOut}
        >
          Sign Out
        </button>
      </div>
      {showModal && (
        <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default ListHeader;
