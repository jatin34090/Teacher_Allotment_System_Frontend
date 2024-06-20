import React from "react";
import { Link } from "react-router-dom";

const Headers = () => {
  return (
    <div className="p-3 bg-gray-100" >
      <ul className=" flex justify-end items-center gap-6 pr-3">
        <li>
            <Link>Alloted Teacher</Link>
        </li>
        <li>
          <Link to={"/addteacher"}>Add Teacher</Link>
        </li>
        <li>
          <Link to={"/addroom"}>Add Room</Link>
        </li>
      </ul>
    </div>
  );
};

export default Headers;
