import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, task, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/todos/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (res.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500/50">
      <div className=" w-[30rem] h-[30rem] bg-slate-100 rounded-xl p-10 shadow-xl">
        <div className=" flex justify-between">
          <h3 className=" text-2xl pb-4"> Let&apos;s {mode} your task</h3>
          <button
            className=" hover:text-xl transition-all"
            onClick={() => {
              setShowModal(false);
            }}
          >
            X
          </button>
        </div>
        <form className=" flex flex-col">
          <input
            className=" rounded-xl p-2 border-slate-300 border-2"
            required
            maxLength={"30"}
            placeholder="Your Task Goes Here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br className="" />
          <label htmlFor="range" className=" pt-4">
            Drag to select your current progress
          </label>
          <input
            className=" m-3 p-[16px] "
            required
            id="range"
            type="range"
            min={"0"}
            max={"100"}
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />

          <input
            className="transition-color mr-2 fill-transparent uppercase border-[#8db591] border-2 p-2 rounded-xl text-[#8db591] hover:bg-[#b6dfba] focus:text-white"
            type="submit"
            value="Submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
