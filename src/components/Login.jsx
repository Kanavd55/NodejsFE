import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

  const [emailId,setEmailId] = useState('')
  const [password,setPassword] = useState('')
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [isLoginForm,setIsLoginForm] = useState(true)
  const [error,setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async() => {
    try {
      const res = await axios.post(BASE_URL+"/login",{emailId,password},{withCredentials:true})
      dispatch(addUser(res.data))
      navigate("/")
    } catch (error) {
      console.log(error)
      setError(error?.response?.data || "Something went wrong");
    }
  }

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials:true})
      setError("Login Now")
      setIsLoginForm(true)
    } catch (error) {
      console.log(error)
      setError(error?.response?.data || "Something went wrong");
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 shadow-xl w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          {!isLoginForm && (<>
            <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">First Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              value={firstName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setFirstName(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              value={lastName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setLastName(e.target.value)}
            />
          </label>
          </>)}
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Email ID</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              value={emailId}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setEmailId(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </label>
          <div className="card-actions justify-center m-2">
            <button className="btn" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "SignUp"}</button>
          </div>
          <p className="text-center cursor-pointer" onClick={()=>setIsLoginForm((prev)=>!prev)}>{isLoginForm ? "New User? Click to Sign Up" : "Alredy registered? Click to Login"}</p>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
