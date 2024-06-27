import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";
import Headers from "./Header/Headers";

const TeacherAllotment = () => {
  const [date, setDate] = useState("");

  const [search, setSearch] = useState("");
  const [examDates, setExamDates] = useState([]);
  const [role, setRole] = useState("");

  const [allDates, setAllDates] = useState([]);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const allotment = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/allocateTeachers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({ date }),
        }
      );
      const data = await response.json();
      console.log("data", data);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Allocated Successfully");
      }
      fetchDates();
    } catch (err) {
      toast.error(err.message);

      console.error(err.message);
    }
  };

  const clearTeachers = async (roomId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/clearTeachers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomId }),
        }
      );
      const jsonData = await response.json();
      console.log(jsonData);
      fetchDates();
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchExamDates = async () => {
    try {
      const responce = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/examDates`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      const data = await responce.json();
      setExamDates(data.uniqueDates);
      console.log("uniquedata", data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getRooms = async (shiftId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/getRooms/${shiftId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      const jsonData = await response.json();
      if (jsonData.error) {
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
    console.log("allData", allData);
    setDetails(allData);
    setLoading(false);
  };

  const fetchDates = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/getalldate`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        setAllDates(data);
        await fetchShiftsForRooms(data);
      }
      setLoading(false);
    } catch (err) {
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
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/getalldate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({ query }),
        }
      );
      const data = await response.json();
      console.log("data", data);
      setAllDates(data);
      fetchShiftsForRooms(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    if (user) {
      if (user.type === "admin") {
        setRole("admin");
        // navigate("/adminhomepage")
      } else {
        // navigate("/myduties")
        setRole("teacher");
      }
    }
    fetchExamDates();
    fetchDates();
  }, []);

  useEffect(() => {
    if (date) {
      setLoading(true);
      allotment();
      setLoading(false);
    }
  }, [date]);

  return (
    <div className="admin-container">
      <Headers />
      <div className="overflow-y-scroll sm:pr-5">
      <Toaster />
      {loading && <Loader />}
          {role === "admin" && (
            <div className="bg-white w-full py-4 my-3 text-center sm:text-xl">
              <label htmlFor="date">Select Date : </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          )}
        <div className="border shadow-md py-4 bg-white w-full my-3 md:text-xl inline-block text-center">
          <label htmlFor="date">Find By Date : </label>
          <select
            className=""
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
        {allDates.length > 0 &&
          allDates.map((examdate, dateIndex) => (
            <div key={dateIndex}>
              <div className="text-center sm:text-xl bg-red-300 p-3 mt-3">
                {examdate.date}
              </div>
              <div className="flex flex-row justify-center items-center">
                <div className="w-full overflow-auto">
                  <table className=" bg-white w-full border border-gray-300">
                    <thead className="">
                      <tr>
                        <th className="border border-gray-300 md:px-4 py-2">
                          Room No
                        </th>
                        <th className="border border-gray-300 md:px-4 py-2">
                          Shift-I
                        </th>
                        <th className="border border-gray-300 md:px-4 py-2">
                          Shift-II
                        </th>
                        <th className="border border-gray-300 md:px-4 py-2">
                          Shift-III
                        </th>
                        {/* <th className="border border-gray-300 px-4 py-2">Date</th> */}
                        {/* <th className="border border-gray-300 px-4 py-2">
                          Actions
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {details[dateIndex] &&
                        details[dateIndex].map((room, roomIndex) => (
                          <tr
                            className="text-center"
                            key={`${room._id}-${roomIndex}`}
                          >
                            <td className="border border-gray-300 px-4 py-2">
                              {room.roomNo}
                            </td>
                            {Array.from({ length: 3 }).map((_, shiftIndex) => (
                              <td
                                className=" border border-gray-300 px-4 py-2"
                                key={shiftIndex}
                              >
                                {room.teachers
                                  .filter(
                                    (teacher) => teacher.date === examdate.date
                                  )
                                  .flatMap((teacher) => teacher.allotedShift)
                                  .find(
                                    (shift) => shift.shift === shiftIndex + 1
                                  )
                                  ?.teacherList.join(", ") || "N/A"}
                              </td>
                            ))}
                            {/* <td className=" border border-gray-300 px-4 py-2">
                              {examdate.date || "N/A"}
                            </td> */}
                            {/* <td className="border border-gray-300 px-4 py-2">
                              <button
                                onClick={() => clearTeachers(room._id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                              >
                                Clear Teachers
                              </button>
                            </td> */}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TeacherAllotment;
