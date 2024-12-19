import React, { useContext, useState, useEffect } from "react";
import loginImg from "../assets/login.png";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const {token, setToken, navigate, backend_url} = useContext(ShopContext)
  const [currState, setCurrState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if(currState === "Sign Up") {
        const response = await axios.post(backend_url + '/api/user/register', {name, email, password});
        if(response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token)
          toast.success("Registration successful!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backend_url + '/api/user/login', {email, password});
        if(response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token)
          toast.success("Login successful!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Failed to login!");
    }
  }

  useEffect(() => {
    if(token){
      navigate("/")
    }
  }, [token])

  return (
    <section className="absolute top-0 w-full h-full left-0 z-50 bg-white">
      <div className="flex h-full w-full">
        <div className="w-1/2 hidden sm:block">
          <img
            src={loginImg}
            alt="loginImg"
            className="object-cover aspect-square w-full h-full"
          />
        </div>
        <div className="flexCenter w-full sm:w-1/2">
          <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800">
            <div className="w-full mb-4">
              <h3 className="bold-36">{currState}</h3>
            </div>
            {currState === "Sign Up" && (
              <div className="w-full">
                <label htmlFor="name" className="medium-14">
                  Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
                />
              </div>
            )}
            <div className="w-full">
              <label htmlFor="email" className="medium-14">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
              />
            </div>
            <div className="w-full">
              <label htmlFor="password" className="medium-14">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter password"
                className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
              />
            </div>
            <button type="submit" className="btn-dark w-full mt-5 !py-[7px] !rounded">
              {currState === "Sign Up" ? "Sign Up" : "Login"}
            </button>
            <div className="w-full flex flex-col gap-y-3 medium-14">
              <div className="underline">Forgot your password?</div>
              {currState === "Login" ? (
                <div className="">Don't have an account? <span onClick={() => setCurrState("Sign Up")} className="cursor-pointer underline hover:text-secondaryOne font-bold">Create Account</span></div>
              ) : (
                <div className="">Already have an account? <span onClick={() => setCurrState("Login")} className="cursor-pointer underline hover:text-secondaryOne font-bold">Login</span></div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
