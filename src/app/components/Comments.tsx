"use client";
import { useRef, useState } from "react";
import { nanoid } from "nanoid";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Comments() {
  const [tasks, setTasks] = useState<{ title: string; id: string }[]>([]);

  const inputReference = useRef<HTMLInputElement>(null);

  const handleAddTasks = () => {
    let inputValue = inputReference?.current?.value as string;

    if (!inputValue) {
      toast.warn("No comment added!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    setTasks([{ title: inputValue, id: nanoid() }, ...tasks]);
    toast.success("Comment added successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    if (inputReference.current) {
      inputReference.current.value = "";
    }
  };

  function onKeyEnter(my_key: React.KeyboardEvent) {
    if (my_key.key === "Enter") {
      handleAddTasks();
    }
  }

  function deleteTask(e: string) {
    setTasks(tasks.filter((elem) => elem.id !== e));
    toast.warn("Comment was deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  return (
    <div>
      <div className="text-xl w-[65vw] mt-9 text-priemery text-wrap text-center py-3 dark:bg-primary bg-slate-300 rounded-md  font-semibold leading-5 ">
        Drop a comment
      </div>
      <div className="m-6 p-10 bg-slate-200 w-[62vw] rounded-xl">
        <div className="flex  gap-3">
          <input
            onKeyDown={onKeyEnter}
            ref={inputReference}
            className="border-2 bg-white border-gray-300 pl-1 outline-none w-[55vw] rounded"
          />
          <button
            onClick={handleAddTasks}
            className="text-black dark:text-white ml-2 rounded bg-blue-300 border-gray-400 border-[1px] px-5"
          >
            Post
          </button>
        </div>

        <ul>
          {tasks.length == 0 ? (
            <h1 className="mt-2 text-black">Drop a comment</h1>
          ) : (
            tasks.map((elem, index) => {
              return (
                <div
                  className="my-5  bg-slate-100 border-[1px]  border-[#8b8a8ab9]  rounded-lg py-3 px-4  justify-between flex items-center  text-[#2b2a2a]"
                  key={elem.id}
                >
                  {elem.title}

                  <button
                    onClick={() => {
                      deleteTask(elem.id);
                    }}
                    className="bg-red-400 text-gray-700  px-4 mr-2 font-semibold py-[3px] rounded-sm "
                  >
                    Delete
                  </button>
                </div>
              );
            })
          )}
        </ul>
        <ToastContainer />
      </div>
    </div>
  );
}
