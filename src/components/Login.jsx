import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

  const [emailId,setEmailId] = useState('')
  const [password,setPassword] = useState('')
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
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 shadow-xl w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
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
            <button className="btn" onClick={handleLogin}>Login</button>
          </div>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
