import React, { useEffect } from "react";
import { useState } from "react";
import Teacher from "./Teacher";
import toast, { Toaster } from 'react-hot-toast';
const Addteacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [search,setSearch] = useState("")
  const [teacherCount, setteacherCount] = useState(0);
  const [allTeacher, setAllteacher] = useState([]);
//   const removeTeacher = (index) => {
//     const filter = teacherCount.filter((_, i) => i !== index);
//     setteacherCount(filter);
//   };




const fetchUsers = (query) => {
  setSearch(query)
  if(query.length==0){
    fetchAllTeacher();
  }else{
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/searchTeachers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    }).then(res => res.json()).then(result => {
      if(result.error){
        toast.error(data.error);
      }

      if (Array.isArray(result.teachers)) {

        setAllteacher(result.teachers);
      } else {
        setAllteacher(result.teachers);
        console.error("Expected an array but got", result);
      }
    })
  }
}

  const fetchAllTeacher = () => {
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/getallteachers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.error){
          toast.error(data.error);
        }
        
        if (Array.isArray(data)) {
          console.log("datateacher", data);
          setAllteacher(data);
        } else {
          console.error("Expected an array but got", data.error);
        }
      }).catch((error) => {
        toast.error(error.message);
      })
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setteacherCount((prev)=>{prev+1});
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

        if(data.error){
          toast.error(data.error);
        } else {
          toast.success(data.message);
        }
        fetchAllTeacher()
      });
    setName("");
    setEmail("");
  };
  useEffect(() => {
    fetchAllTeacher();
  }, [teacherCount]);
  useEffect(() => {
      fetchAllTeacher();
  },[])
  return (
    <div className=" relative bg-slate-500 w-2/3 m-auto py-4 px-8 mt-3 ">
      <Toaster/>
      <h1>Add Teachers</h1>
      <form className="flex flex-col gap-5" onSubmit={submitHandler}>
        <input
          className="p-2"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="p-2"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <button className="bg-sky-400 p-2" type="submit">
          ADD
        </button>
      </form>

        <div className=" flex justify-center  mt-6 mb-2 h-10 ">
          <input className=" text-center"
            style={{ color: "black" }}
            type="text"
            placeholder="search"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
        </div>

    <div className="overflow-y-scroll max-h-80"  style={{scrollbarWidth: "none"}}>
      {allTeacher?allTeacher.map(
        (item, index) => (
          (
            <Teacher
              key={index}
              name={item.name}
              email={item.email}
              initialCheckedTeacher={item.avalability}
              initialleave={item.leave}
              allotedRooms = {item.allotedRooms}

              index={item._id}
            />
          )
        )
      ):
      <h1>No teachers found</h1>
      }

    </div>
    </div>
  );
};

export default Addteacher;
