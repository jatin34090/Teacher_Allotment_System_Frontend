import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const clickHandler = () => {
    console.log(name, email, password, type);
    fetch(`${import.meta.env.VITE_APP_API_URL}api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        type
      })
    }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
          alert("Signup Successfull");
          navigate("/");
        }
      });
  };

  return (
    <div className="container mt-8 flex justify-center ">
      <div className="flex flex-col gap-5 p-8 m-auto rounded-3xl w-1/2 h-2/3 border border-gray-300 mt-10 text-center max-w-md">
        <h2 className="text-3xl hover:text-sky-400">Signup</h2>
        <input
          className="h-10 p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <input
          className="h-10 p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          className="h-10 p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <select name="selectType" onClick={(e) => setType(e.target.value)}>
          <option value="user" >user</option>
          <option value="admin" >admin</option>
        </select>
        <button
          onClick={() => clickHandler()}
          className=" py-2 px-3 text-xl border-2 rounded-md hover:bg-sky-400"
        >
          Login
        </button>
        <h5 className="mt-4">
          <Link className="hover:text-sky-400" to="/login">
            Already have an account ?
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
