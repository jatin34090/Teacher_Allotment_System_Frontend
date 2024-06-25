import { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("user");
    const clickHandler = () => {
      console.log(email, password);
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          type
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          
          if (data.error) {
            // alert(data.error);
            toast.error(data.error);
          } else {
            localStorage.setItem("jwt", data.authToken);
          localStorage.setItem("user", JSON.stringify(data.teacher));
            toast.success("Successfully Logged in");
            if(type === "admin"){
              window.location.href = "/adminhomepage";
            }else{
              window.location.href = "/myduties";
            }
          } 
        });
    }
  return (

      <div className=" flex justify-center items-center">
        <Toaster />
        <div className=" flex flex-col gap-8 rounded-3xl border-4 border-sky-700 p-8 mt-10 text-center max-w-md">
          <h2 className="text-3xl p-2 hover:text-sky-400 rounded-2xl bg-sky-100" >Login</h2>
          <input
          className="outline-none border text-xl border-gray-300 px-2 py-4 rounded-lg"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
          className="outline-none border text-xl border-gray-300 px-2 py-4 rounded-lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
           <select name="selectType" className="outline-none border text-xl border-gray-300 px-2 py-2 rounded-lg" onClick={(e) => setType(e.target.value)}>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        
          <button
            onClick={() => clickHandler()}
            className=" py-2 px-3 text-2xl border-2 hover:bg-sky-100 rounded-lg"
          >
            Login
          </button>
          <h5 className="m-5">
            <Link className="hover:text-sky-400" to="/signup">
              Don't have an account ?
            </Link>
          </h5>
          <h6>
            <Link className="hover:text-sky-400" to="/resetpassword">
              Forget Password ?
            </Link>
          </h6>
        </div>
      </div>


  );
};

export default Login;


