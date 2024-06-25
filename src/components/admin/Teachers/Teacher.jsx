import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import EditTeacherAllotment from "./EditTeacherAllotment";

const Teacher = ({
  name,
  email,
  initialCheckedTeacher,
  allotedRooms,
  initialleave,
  index,
}) => {
  const [checkedTeacher, setCheckedTeacher] = useState(initialCheckedTeacher);
  const [showAllotment, setShowAllotment] = useState(false);
  const [leaveStatus, setLeaveStatus] = useState(initialleave);
  const [editAllotment, seteditAllotment] = useState(false);
  const editAllotedRooms = () => {
    seteditAllotment(!editAllotment);
    // setShowAllotment(!showAllotment);
  };

  const TeacherAllotment = ({ name, email, allotedRooms, func }) => {
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "scroll";
      };
    }, []);
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 "
          style={{ backgroundColor: "rgba(189,189,189,0.9)" }}
        ></div>
        <div className=" text-center fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-1/3 bg-white p-7 m-3 rounded-xl">
          <div className="text-2xl ">
            <strong>Name : </strong>
            {name} <strong className="ml-3">Email : </strong>
            {email}
          </div>
          <div className="text-2xl "></div>
          <div className="text-2xl w-full my-4 rounded-full bg-slate-500 text-white">
            Alloted Rooms
          </div>
          <table className="table-auto w-full border-collapse border border-gray-300 p-8">
            <thead>
 
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Room No</th>
                  <th className="border border-gray-300 px-4 py-2">Shift</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                </tr>

            </thead>
            <tbody>
              {allotedRooms.map((room, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {room.room}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {room.Shift}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {room.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="bg-sky-400 px-6 rounded-xl py-1 mt-4"
            onClick={func}
          >
            Close
          </button>
        </div>
      </>
    );
  };
  const btnClickHandler = () => {
    setShowAllotment(!showAllotment);
  };

  const checkboxClickHandler = () => {
    const newCheckedStatus = !checkedTeacher;
    setCheckedTeacher(newCheckedStatus);
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/updateteacherAvailability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        avalability: newCheckedStatus,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Teacher availability updated:", data);
      })
      .catch((error) => {
        console.error("Error updating teacher availability:", error);
        setCheckedTeacher(!newCheckedStatus);
      });
  };

 
  const leavehandler = () => {
    const newLeaveStatus = !leaveStatus;
    setLeaveStatus(newLeaveStatus);
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/updateLeaveStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        leave: newLeaveStatus,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setLeaveStatus(!newLeaveStatus);
          toast.error(data.error);
        } else {
          toast.success(data.message);
        }
      });
  };
  return (
    
    <div className="">
      <Toaster />
      <div className="flex justify-center item-center bg-white p-3 border-3 mb-5 w-full">
        <div className="w-full">
          <p>{name}</p>
          <span className="text-gray-500">{email}</span>
        </div>

        <button
          className="px-6 rounded-xl transform transition-transform hover:scale-110 py-1 mr-4"
          onClick={btnClickHandler}
          style={{background: "rgba(0,115,225,0.3"}}
        >
          Show Duties
        </button>
        <button
          className=" px-6 rounded-xl transform transition-transform hover:scale-110 py-1 mr-4"
          onClick={leavehandler}
          style={{background: "rgba(0,115,225,0.3"}}
        >
          {leaveStatus ? "Not Available" : "Available"}
        </button>
        <button
          className="px-6 rounded-xl transform transition-transform hover:scale-110 py-1"
          onClick={editAllotedRooms}
          style={{background: "rgba(0,115,225,0.3"}}
        >
          Edit
        </button>
        {
          // initialCheckedTeacher != undefined && (
          //   <input
          //     type="checkbox"
          //     checked={checkedTeacher}
          //     onChange={checkboxClickHandler}
          //   />
          // )
        }
      </div>
      {editAllotment && (
        <EditTeacherAllotment
          name={name}
          email={email}
          allotedRooms={allotedRooms}
          editAllotment={editAllotment}
          setEditAllotment={seteditAllotment}
        />
      )}
      {showAllotment && (
        <TeacherAllotment
          name={name}
          email={email}
          allotedRooms={allotedRooms}
          func={btnClickHandler}
        />
      )}
    </div>
    
  );
};

export default Teacher;


