import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { HiMenuAlt4 } from "react-icons/hi";
import Li from "./Li";

const renderList = () => {
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const checkUserType = () => {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user.type !== "admin") {
        setType("teacher");
      } else {
        setType("admin");
      }
    }
  };
  useEffect(() => {
    checkUserType();
  }, []);
  const logoutClickHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (type === "admin") {
    return [
      <Li url={"/teacherAllotment"} text={"Alloted Teacher"} key={1}></Li>,
      <Li url={"/addteacher"} text={"Add Teacher"} key={2}></Li>,
      <Li url={"/addroom"} text={"Add Room"} key={3}>
      </Li>,
      <li key={4}>
        <button
          onClick={() => logoutClickHandler()}
          className="py-2 px-3 text-xl text-center border-2 hover:bg-custom-blue rounded-md"
        >
          Logout
        </button>
      </li>,
    ];
  } else if (type === "teacher") {
    return [
      <Li url={"/myduties"} text={" My Duties"} key={1}></Li>,
      <Li url={"/teacherAllotment"} text={"Alloted Teacher"} key={2}></Li>,
      <li key={3}>
        <button
          onClick={() => logoutClickHandler()}
          className=" py-2 px-3 text-xl text-center border-2 hover:bg-custom-blue rounded-md "
        >
          Logout
        </button>
      </li>,
    ];
  } else {
    return [];
  }
};
const Headers = () => {
  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [phoneActive, setPhoneActive] = useState(window.innerWidth < 1100);

  return (
    <>
      {phoneActive && (
        <button id="hamourger" onClick={() => setShowModal(true)}>
          <HiMenuAlt4 />
        </button>
      )}
      <aside
        className="header "
        style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: showModal ? "0" : "-20rem",
                transition: "all 0.5s",
              }
            : {}
        }
      >
        <ul className=" flex flex-col gap-9 justify-center items-center pt-10">
          {renderList()}
        </ul>
        {showModal && (
          <button
            onClick={() => setShowModal(false)}
            className="text-xl absolute top-3 right-5"
          >
            X
          </button>
        )}
      </aside>
    </>
  );
};

export default Headers;
