import { useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const clickHandler = () => {
      console.log(email, password);
      fetch(`${import.meta.env.VITE_APP_API_URL}api/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            alert(data.error);
          } else {
            alert("Login Successfull");
            window.location.href = "/";
          } 
        });
    }
  return (

      <div className="container mt-8 flex justify-center">
        <div className=" flex flex-col gap-5 rounded-3xl border border-gray-300 p-8 m-auto mt-10 text-center max-w-md">
          <h2 className="text-3xl hover:text-sky-400">Login</h2>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            onClick={() => clickHandler()}
            className=" py-2 px-3 text-xl border-2 hover:bg-sky-400 rounded-md"
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
