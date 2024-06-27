import React, { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
    // const [role, setRole] = useState("");
     useEffect(() => {
          const user = JSON.parse(localStorage.getItem("user")) || null;
          if (user) {
           navigate("/teacherAllotment")
          } else {
            navigate("/login");
          }
        },[navigate]);
  return null;
}

export default Home