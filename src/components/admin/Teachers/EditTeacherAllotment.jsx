import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const EditTeacherAllotment = ({
  name,
  email,
  allotedRooms,
  setEditAllotment,
}) => {
  const editAllotedRooms = () => {
    setEditAllotment(false); // This will close the EditTeacherAllotment component
  };
  const [teacher, setTeacher] = useState();
  const [date, setDate] = useState();
  const [shift, setShift] = useState();
  const [roomNo, setRoomNo] = useState();
  const [teacherAvailable, setteacherAvailable] = useState();
  const editRoom = (newTeacher) => {
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/editRoom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),

      },
      body: JSON.stringify({
        roomNo,
        date,
        shift,
        newTeacher,
        prevTeacher: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data) {
          toast.success("Teacher Allocated Successfully");
        }
      });
  };
  const editNewTeacher = (email) => {
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/editTeacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),

      },
      body: JSON.stringify({
        email,
        date,
        shift,
        roomNo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data) {
          toast.success("Teacher Allocated Successfully");
        }
      });
    editPreviousTeacher();
    editRoom(email);
  };

  const editPreviousTeacher = () => {
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/editPreviousTeacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),

      },
      body: JSON.stringify({
        email,
        date,
        shift,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data) {
          toast.success("Teacher Leave Granted Successfully");
        }
      });
  };
  const editTeacher = (e) => {
    console.log("e.target.value ", allotedRooms);
    console.log("email ", email);

    setTeacher(e.target.value);
    editNewTeacher(e.target.value);

    setteacherAvailable();
    console.log("jatin chal gaya ye to ", e.target.value);
  };
  const getAvailableTeachers = (date, shift, roomNo) => {
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/availableteachers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),

      },
      body: JSON.stringify({
        date,
        shift,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (Array.isArray(data)) {
          setteacherAvailable(data);
          setDate(date);
          setShift(shift);
          setRoomNo(roomNo);
          console.log("data", data);
        } else {
          console.error("Expected an array but got", data);
        }
      });
  };

  useEffect(() => {
    console.log("editAllotment", allotedRooms);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <>
      <Toaster />
      <div
        className="fixed top-0 left-0 right-0 bottom-0"
        style={{ backgroundColor: "rgba(189,189,189,0.9)" }}
      ></div>
      <div className="text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 bg-white p-7 m-3 rounded-xl">
        <div className="text-2xl">
          <strong>Name : </strong>
          {name} <strong className="ml-3">Email : </strong>
          {email}
        </div>
        <div className="text-2xl w-full my-4 rounded-full bg-slate-500 text-white">
          Alloted Rooms
        </div>
        <table className="table-auto w-full border-collapse border border-gray-300 p-8">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Room</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Shift</th>
            </tr>
          </thead>
          <tbody>
            {/* {console.log("typeOf allotedRooms", typeof(allotedRooms))} */}
            {allotedRooms.length>0 ? (
              allotedRooms.map((room, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {room.room}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {room.date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {room.Shift}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        getAvailableTeachers(room.date, room.Shift, room.room)
                      }
                      className="w-full bg-sky-400 hover:bg-sky-600 text-white border border-gray-300 px-4 py-2"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <h2>No Alloted Rooms</h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <button
          className="bg-sky-400 px-6 rounded-xl py-1 mt-4"
          onClick={editAllotedRooms}
        >
          Close
        </button>
      </div>
      {teacherAvailable && (
        // console.log("jatin bhai chal gaya ye to")
        <>
          <div
            className="fixed top-0 left-0 right-0 bottom-0 "
            style={{ backgroundColor: "rgba(189,189,189,0.9)" }}
          ></div>
          <div className=" text-center fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-1/3 bg-white p-7 m-3 rounded-xl">
            <select
              onChange={editTeacher}
              value={teacher}
              className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">Select a Teacher</option>

              {teacherAvailable.map((teacher, index) => (
                <option key={index} value={teacher.email}>
                  Name: {teacher.name} Email: {teacher.email}
                </option>
              ))}
            </select>
            <button onClick={() => setteacherAvailable()}>Close</button>
          </div>
        </>
      )}
    </>
  );
};

export default EditTeacherAllotment;
