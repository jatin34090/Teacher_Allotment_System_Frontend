import React, { useEffect } from "react";
import { useState } from "react";
import Headers from "../Header/Headers";
import Loader from "../Loader";


const MyDuties = () => {
  const [MyDuties, setMyDuties] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    setName(user.name);
    setEmail(user.email);
    console.log(user.email);
    fetchMyDuties(user.email);
  }, []);
  const fetchMyDuties = async (email) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/getteachers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({ email }),
        }
      );
      const jsonData = await response.json();
      if(jsonData.error) {
        toast.error(jsonData.error);
        return;
      }
      console.log("MyDuties", jsonData);

      setMyDuties(jsonData);
      setLoading(false);
    } catch (err) {
      console.error(err.message);

      setLoading(false);
    }
  };
  return (
    <div className="admin-container">
      <Headers />

     {loading ? <Loader/> : (<div className="flex text-center flex-col items-center pt-10 sm:pr-5 overflow-y-scroll">
        <div className="sm:text-xl bg-sky-100 w-full text-center p-4 font-bold mb-4">Name  : <span className="sm:text-xl text-sky-400 w-full text-center p-4 font-bold mb-4">{name}</span> </div>
        <div className="sm:text-xl bg-sky-100 w-full text-center p-4 font-bold mb-4">Email  : <span className="sm:text-xl text-sky-400 w-full text-center p-4 font-bold mb-4"> {email} </span></div>
        <div className="sm:text-xl bg-red-300 w-full text-center p-4 font-bold ">My Duties</div>
        {MyDuties.length !== 0 ? (
            <div className="w-full overflow-auto">
          <table className="bg-white w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 md:px-4 py-2">Room</th>
                <th className="border border-gray-300 md:px-4 py-2">Shift</th>
                <th className="border border-gray-300 md:px-4 py-2">Date</th>
                {/* <th className="border border-gray-300 md:px-4 py-2">Teacher</th> */}
              </tr>
            </thead>
            <tbody>
              {MyDuties.map((duty, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {duty.room}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {duty.Shift}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {duty.date}
                  </td>
                  {/* <td className="border border-gray-300 px-4 py-2">
                    {duty.teacher}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        ) : (
          <p className="text-2xl">No Duties</p>
        )}
      </div>)}
    </div>
  );
};

export default MyDuties;
