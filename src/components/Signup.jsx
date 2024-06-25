import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [type, setType] = useState("user");
  const navigate = useNavigate();


  const clickHandler = () => {
    if(!name || !email || !password || !type){

      toast.error("Please fill all the fields")
      return;
    }
    if(type === "admin"){
      console.log(import.meta.env.VITE_APP_KEY);
      if(secretKey !== import.meta.env.VITE_APP_KEY){
        toast.error("Invalid Secret Key")
        return;
      }
    }

    console.log(name, email, password, type);
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      
        if (data.error) {
          toast.error(data.error)
        } else {
          localStorage.setItem("jwt", data.authToken);
          localStorage.setItem("user", JSON.stringify(data.teacher));
          toast.success("Successfully Signed up");
          if(type === "admin"){
            navigate("/adminHomePage");
          }else{
            navigate("/");
            
          }
        }
      });

  };

  return (
    <div className=" flex justify-center items-center ">
      <Toaster/>
      <div className="flex flex-col gap-5 p-8 rounded-3xl border-4 border-sky-700 mt-10 text-center max-w-md">
        <h2 className="text-3xl p-2 rounded-2xl bg-sky-100 hover:text-sky-400">Signup</h2>
        <input
          className="outline-none border text-xl border-gray-300 px-2 py-2 rounded-lg "
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <input
          className="outline-none border text-xl border-gray-300 px-2 py-2 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          className="outline-none border text-xl border-gray-300 px-2 py-2 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <select name="selectType" className="outline-none border text-xl border-gray-300 px-2 py-2 rounded-lg" onClick={(e) => setType(e.target.value)}>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        {type === "admin" && <input
          className="outline-none border text-xl border-gray-300 px-2 py-2 rounded-lg"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          type="text"
          placeholder="Secret Key"
        />}
        <button
          onClick={() => clickHandler()}
          className=" py-3 px-3 text-xl border-2 hover:bg-sky-100 rounded-lg"
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
