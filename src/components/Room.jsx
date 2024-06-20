import { useState, useEffect } from "react";

const Room = ({ roomNo, capacity, initialCheckedRoom, teacherAllocated }) => {
  const [checkedRoom, setCheckedRoom] = useState(initialCheckedRoom);
  const [showAllotment, setShowAllotment] = useState(false);

  const btnClickHandler = () => {
    setShowAllotment(!showAllotment);
  };

  const RoomAllotment = () => {
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
            <strong>Room No. : </strong>
            {roomNo} <strong className="ml-3">Capacity : </strong>
            {capacity}
          </div>
          <div className="text-2xl "></div>
          <div className="text-2xl w-full my-4 rounded-full bg-slate-500 text-white">
            Alloted Teacher
          </div>
          <table className="table-auto w-full border-collapse border border-gray-300 p-8">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Shift I</th>
                <th className="border border-gray-300 px-4 py-2">Shift II</th>
                <th className="border border-gray-300 px-4 py-2">Shift III</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {teacherAllocated.map((teacher, index) =>
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {teacher.allotedShift[0].teacherList.join(" , ")}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {teacher.allotedShift[1].teacherList.join(" , ")}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {teacher.allotedShift[2].teacherList.join(" , ")}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      {teacher.date}
                    </td>
                  </tr>
              )}
            </tbody>
          </table>

          <button
            className="bg-sky-400 px-6 rounded-xl py-1 mt-4"
            onClick={btnClickHandler}
          >
            Close
          </button>
        </div>
      </>
    );
  };
  const clickHandler = () => {
    const newCheckedStatus = !checkedRoom;
    console.log("newCheckedStatus", newCheckedStatus);
    setCheckedRoom(newCheckedStatus);
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/updateroomavalability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomNo: roomNo,
        avalability: newCheckedStatus,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Room availability updated:", data);
      })
      .catch((error) => {
        console.error("Error updating Room availability:", error);
        setCheckedRoom(!newCheckedStatus);
      });
  };
  return (
    <div>
      <div className="flex justify-center item-center bg-gray-100 p-3 border-3 mb-5">
        <div className="w-full">
          <p>{roomNo}</p>
          <span className="text-gray-500">{capacity}</span>
        </div>
        <button className="bg-sky-400 w-40 m-2" onClick={btnClickHandler}>
          Show Allotment
        </button>
        {initialCheckedRoom != undefined && (
          <input
            type="checkbox"
            checked={checkedRoom}
            onChange={clickHandler}
          />
        )}
      </div>
      {showAllotment && <RoomAllotment />}
    </div>
  );
};

export default Room;
