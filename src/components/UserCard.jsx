import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
    const {firstName,lastName,photoUrl,age,gender,about,_id} = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status,userId) => {
      try {
        const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true})
        dispatch(removeUserFromFeed(userId))
      } catch (error) {
        console.log(error)
      }
    }
  return (
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={photoUrl}
            alt="photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName+" "+lastName}</h2>
          <p>
            {about}
          </p>
          <div className="card-actions justify-end">
            <button onClick={()=>handleSendRequest("ignored",_id)} className="btn btn-primary">Ignore</button>
            <button onClick={()=>handleSendRequest("interested",_id)} className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
  );
};

export default UserCard;
