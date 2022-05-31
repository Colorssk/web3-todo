import React, { useState } from "react";

const Dropdown = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const onDragMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <div className="flex">
      <div className="relative inline-block">
        <button
          className="relative z-10 block p-1 text-gray-700  rounded-md dark:text-white"
          onClick={onDragMenu}
        >
          <svg
            className="w-5 h-5 text-white dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {menuVisible ? (
          <div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-purple-500 rounded-md shadow-lg dark:bg-gray-800">
            <a
              href="#"
              className="block px-4 py-3 text-sm text-white capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {" "}
              your profile{" "}
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-sm text-white capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {" "}
              Your projects{" "}
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-sm text-white capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {" "}
              Help{" "}
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-sm text-white capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {" "}
              Settings{" "}
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-sm text-white capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-pink-500 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {" "}
              Sign Out{" "}
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
