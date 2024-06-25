import React, { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import MyDuties from './teachers/MyDuties';

import AdminHomePage from './admin/AdminHomePage';

const Home = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
     useEffect(() => {
          const user = JSON.parse(localStorage.getItem("user"));
          if (user) {
            if (user.type === "admin") {
              setRole("admin");
            }else{
              setRole("teacher");
            }
          } else {
            navigate("/login");
          }
        },[]);
  return (
    <>
    {role==="admin"?<AdminHomePage/>:<MyDuties/>}
    </>
  )
}

export default Home