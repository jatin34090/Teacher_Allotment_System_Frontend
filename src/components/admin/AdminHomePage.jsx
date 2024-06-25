import React, { useEffect, useState } from "react";
import TeacherAllotment from "../TeacherAllotment";
import Headers from "../Header/Headers";
import Loader from "../Loader";

const AdminHomePage = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [examDates, setExamDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});

  const [allDates, setAllDates] = useState([]);


  const allotment = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/allocateTeachers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ date }),
      });
      const data = await response.json();
      console.log("data", data);
      if(data.error) {
        toast.error(data.error);
      }
      else{
        toast.success("Allocated Successfully");
      }
      fetchDates();
      fetchExamDates();

    } catch (err) {
      toast.error(err.message);

      console.error(err.message);
    }
  };
  const fetchQueryDates = async (query) => {
    console.log("query", query);
    setSearch(query);
    if (query.length === 0) {
      fetchDates();
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/getalldate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),

          
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      console.log("data", data);
      setAllDates(data);
      fetchShiftsForRooms(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchExamDates = async () => {
    try {
      const responce = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/examDates`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const data = await responce.json();
      setExamDates(data.uniqueDates);
      console.log("uniquedata", data);
      
    } catch (err) {
      console.error(err.message);
    }
  };
  const getRooms = async (shiftId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/getRooms/${shiftId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const jsonData = await response.json();
      if(jsonData.error) {
        toast.error(jsonData.error);
      }
      return jsonData;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  const fetchShiftsForRooms = async (data) => {
    const allData = {};
    await Promise.all(
      data.map(async (examdate, index) => {
        allData[index] = await Promise.all(
          examdate.rooms.map((shiftId) => getRooms(shiftId))
        );
      })
    );
    console.log(allData);
    setDetails(allData);
  };
  const fetchDates = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/getalldate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const data = await response.json();
      if(data.error) {
        toast.error(data.error);
      }else{
        setAllDates(data);
        fetchShiftsForRooms(data);

      }
    } catch (err) {
      console.error(err.message);
    }
  };




  useEffect(() => {
    setLoading(true);
    fetchDates();
    fetchExamDates();
setLoading(false);
  }, []);

  useEffect(() => {
    if (date) {
      setLoading(true);
      allotment();
      setLoading(false);
    }
  }, [date]);
 
  return (
    <div
      className="admin-container"
    >
      <Headers />
      <div className="overflow-y-scroll sm:pr-5">
        {loading && <Loader />}

      <div className="border shadow-md py-4 bg-white w-full my-3 md:text-xl inline-block text-center">
        <label htmlFor="date">Find By Date :  </label>
        <select className=""
          id="date"
          value={search}
          onChange={(e) => fetchQueryDates(e.target.value)}
        >
          <option value="">Select a date</option>
          {examDates.map((examdate, index) => (
            <option key={index} value={examdate}>
              {examdate}
            </option>
          ))}
        </select>
        </div>
        <div className="bg-white w-full py-4 my-3 text-center sm:text-xl">
          <label htmlFor="date">Select Date  : </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      <TeacherAllotment allDate={allDates} detail={details} />
      </div>
    </div>
  );
};

export default AdminHomePage;
