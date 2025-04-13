import React from "react";
import { Link } from "react-router-dom";

const NoEventsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-auto text-center p-6">
      <h2 className="text-3xl font-semibold text-gray-800">No Events Found</h2>
      <p className="text-gray-600 mt-2">It looks like there are no events matching your criteria.</p>
    </div>
  );
};

export default NoEventsFound;
