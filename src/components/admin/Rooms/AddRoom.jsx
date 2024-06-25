import { useEffect, useState } from "react";
import Room from "./Room";
import toast, { Toaster } from "react-hot-toast";
import Headers from "../../Header/Headers";
import Search from "../../Search/Search";

const AddRoom = () => {
  const [roomNo, setRoomNo] = useState("");
  const [capacity, setCapacity] = useState(undefined);
  const [roomDetails, setRoomDetails] = useState([]);
  const [allRoom, setAllRoom] = useState(null);
  const [search, setSearch] = useState("");

  const fetchRoom = (query) => {
    setSearch(query);
    if (query.length == 0) {
      fetchAllRoom();
    } else {
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/searchrooms`, {
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
          if (Array.isArray(result.rooms)) {
            setAllRoom(result.rooms);
          } else {
            setAllRoom(result.rooms);
            console.error("Expected an array but got", result);
            console.log("result", result);
          }
        });
    }
  };
  const fetchAllRoom = async () => {
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/getallrooms`, {
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
          setAllRoom(data);
          console.log("roomsdata", data);
        } else {
          console.error("Expected an array but got", data);
        }
      });
  };
  const addRoom = async () => {
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/addroom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomNo,
        capacity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
        }
        fetchAllRoom();
        setRoomNo("");
        setCapacity("");
      });
  };
  useEffect(() => {
    fetchAllRoom();
  }, []);
  useEffect(() => {
    fetchAllRoom();
  }, [roomDetails]);
  const submitHandler = async (e) => {
    e.preventDefault();
    setRoomDetails([...roomDetails, { roomNo, capacity }]);
    addRoom();
  };
  return (
    <div className="admin-container">
      <Headers/>
      
    <div className="overflow-y-scroll text-center sm:pr-5">
        <Search func={fetchRoom} />
      <Toaster />
      <span className="text-3xl mx-auto text-center p-3 rounded-3xl bg-white" style={{background: "rgba(0,115,225,0.1"}}>Add Rooms</span>
      <form className="flex flex-col m-5 gap-5" onSubmit={submitHandler}>
        <input
          className="p-2 outline-none"
          type="number"
          placeholder="Enter Room Number"
          value={roomNo}
          onChange={(e) => setRoomNo(e.target.value)}
          required
        />
        <input
          className="p-2 outline-none"
          type="number"
          placeholder="Enter Room Capicity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
        ></input>
        <button className=" p-4 m-auto rounded-2xl w-full md:w-1/3 lg:w-1/6" style={{background: "rgba(0,115,225,0.2"}} type="submit">
          ADD
        </button>

      
      </form>
      <div
        className="text-start m-5"
        style={{ scrollbarWidth: "none" }}
      >
        {allRoom ? (
          allRoom.map((item, index) => (
            <Room
              key={index}
              roomNo={item.roomNo}
              capacity={item.capacity}
              teacherAllocated = {item.teachers}
              initialCheckedRoom={item.avalability}
            />
          ))
        ) : (
          <h1>No Room found</h1>
        )}
      </div>
    </div>
    </div>
  );
};

export default AddRoom;
