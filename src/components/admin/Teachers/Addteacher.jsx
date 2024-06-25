import React, { useEffect } from "react";
import { useState } from "react";
import Teacher from "./Teacher";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";

import toast, { Toaster } from "react-hot-toast";
import Headers from "../../Header/Headers";
import Search from "../../Search/Search";
const Addteacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [teacherCount, setteacherCount] = useState(0);
  const [allTeacher, setAllteacher] = useState([]);
  //   const removeTeacher = (index) => {
  //     const filter = teacherCount.filter((_, i) => i !== index);
  //     setteacherCount(filter);
  //   };

  const fetchUsers = (query) => {
    setSearch(query);
    if (query.length == 0) {
      fetchAllTeacher();
    } else {
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/searchTeachers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.error) {
            toast.error(data.error);
          }

          if (Array.isArray(result.teachers)) {
            setAllteacher(result.teachers);
          } else {
            setAllteacher(result.teachers);
            console.error("Expected an array but got", result);
          }
        });
    }
  };

  const fetchAllTeacher = () => {
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/getallteachers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (Array.isArray(data)) {
          console.log("datateacher", data);
          setAllteacher(data);
        } else {
          console.error("Expected an array but got", data.error);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setteacherCount((prev) => {
      prev + 1;
    });
    await fetch(`${import.meta.env.VITE_APP_API_URL}/api/addteacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
        }
        fetchAllTeacher();
      });
    setName("");
    setEmail("");
  };
  useEffect(() => {
    fetchAllTeacher();
  }, [teacherCount]);
  useEffect(() => {
    fetchAllTeacher();
  }, []);
  return (
    <div className="admin-container">
      <Headers />
      <div className=" overflow-y-scroll text-center sm:pr-5">
        <Toaster />
        <Search func={fetchUsers}/>

        <span className="text-3xl  text-center p-3 rounded-3xl bg-white" style={{background: "rgba(0,115,225,0.1"}}>Add Teachers</span>
        <form className="flex flex-col m-5 gap-5" onSubmit={submitHandler}>
          <input
            className="p-2 outline-none"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="p-2 outline-none"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <button className="p-4 m-auto rounded-2xl text-xl w-full md:w-1/3 lg:w-1/6 transform transition-transform hover:scale-110 " style={{background: "rgba(0,115,225,0.1"}} type="submit">
            ADD
          </button>
        </form>

        <div className=" text-start m-5" style={{ scrollbarWidth: "none" }}>
          {allTeacher ? (
            allTeacher.map((item, index) => (
              <Teacher
                key={index}
                name={item.name}
                email={item.email}
                initialCheckedTeacher={item.avalability}
                initialleave={item.leave}
                allotedRooms={item.allotedRooms}
                index={item._id}
              />
            ))
          ) : (
            <h1>No teachers found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Addteacher;
