import React from "react";
import CircleLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div>
      <div
        className="fixed top-0 left-0 right-0 bottom-0"
        style={{ backgroundColor: "rgba(189,189,189,0.9)" }}
      ></div>
      <div className="text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3p-7 m-3 rounded-xl">
        <CircleLoader size={50} />
      </div>
    </div>
  );
};

export default Loader;
