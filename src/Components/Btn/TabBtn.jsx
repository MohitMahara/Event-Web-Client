import React from "react";

export const TabBtn = ({ text, tabNo, openedTab, setOpenedTab }) => {
  return (
    <>
      <button
        className={`px-6 py-2 mx-2 rounded-full font-medium transition ${
          openedTab == tabNo
            ? "bg-white text-blue-500 shadow-md1"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={() => setOpenedTab(tabNo)}
      >
        {text}
      </button>
    </>
  );
};
