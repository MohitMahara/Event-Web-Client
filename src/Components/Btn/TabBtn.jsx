import React from "react";

export const TabBtn = ({ text, tabNo, openedTab, setOpenedTab }) => {
  return (
    <>
      <button
        className={`md:px-6 md:py-2 md:mx-2 px-4 py-1 mx-1 rounded-full font-medium transition ${
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
