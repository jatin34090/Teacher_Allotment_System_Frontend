import React, { useRef, useEffect, useState } from "react";

const Home = () => {
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [date, setDate] = useState('');
  const [countDates, setCountDates] = useState(0);
  const [shifts, setShifts] = useState({});
  const [loopCount, setLoopCount] = useState(0);
  const isInitialMount = useRef(true);

  const countDate = async () => {
    try {
      const response = await fetch('/api/examDatesCount', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonData = await response.json();
      console.log("response", jsonData);
      setCountDates(jsonData);
      allotment(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  const allotment = async (countDates) => {
    try {
      const response = await fetch("/api/allocateTeachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, countDates }),
      });
      const data = await response.json();
      console.log("data", data);
      fetchAvailableRooms();
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchAvailableRooms = async () => {
    try {
      const response = await fetch("/api/availablerooms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.length > 0 && data[0].teachers.length > 0) {
        setLoopCount(data[0].teachers.length);
        setRooms(data);
        console.log(data);
      } else {
        setRooms([]);
        setShifts({});
        setLoopCount(0);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const clearTeachers = async (roomId) => {
    try {
      const response = await fetch("/api/clearTeachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId }),
      });
      const jsonData = await response.json();
      console.log(jsonData);
      fetchAvailableRooms();
    } catch (err) {
      console.error(err.message);
    }
  };

  const getShiftModel = async (shiftId) => {
    try {
      const response = await fetch(`/api/getShiftModel/${shiftId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      return jsonData;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  const fetchShiftsForRooms = async (rooms) => {
    const shiftsData = {};
    await Promise.all(
      rooms.map(async (room) => {
        shiftsData[room.roomNo] = await Promise.all(
          room.teachers.map((shiftId) => getShiftModel(shiftId))
        );
      })
    );
    console.log("shiftsData", shiftsData);
    setShifts(shiftsData);
  };

  useEffect(() => {
    if(date){
      countDate();
      
    }
  }, [date]);

  useEffect(() => {
    fetchAvailableRooms();
  }, []);

  useEffect(() => {
    if (rooms.length > 0) {
      fetchShiftsForRooms(rooms);
    }
  }, [rooms]);

  return (
    <>
      <div className="date-picker">
        <label htmlFor="date">Select Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      {rooms.length > 0 && shifts && (
        <div className="flex flex-row justify-center items-center">
          <div className="w-full overflow-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead className="sticky">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Room No</th>
                  <th className="border border-gray-300 px-4 py-2">Shift-I</th>
                  <th className="border border-gray-300 px-4 py-2">Shift-II</th>
                  <th className="border border-gray-300 px-4 py-2">Shift-III</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: loopCount }).map((_, index) => (
                  rooms.map((room) => (
                    <tr key={`${room._id}-${index}`}>
                      <td className="border border-gray-300 px-4 py-2">{room.roomNo}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {shifts[room.roomNo]?.[index]?.allotedShift?.[0]?.teacherList?.join(", ") || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {shifts[room.roomNo]?.[index]?.allotedShift?.[1]?.teacherList?.join(", ") || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {shifts[room.roomNo]?.[index]?.allotedShift?.[2]?.teacherList?.join(", ") || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {shifts[room.roomNo]?.[index]?.date || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          onClick={() => clearTeachers(room._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Clear Teachers
                        </button>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
          <div className="roomsList"></div>
          <div className="shifts"></div>
        </div>
      )}
    </>
  );
};

export default Home;
