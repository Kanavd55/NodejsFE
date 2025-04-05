import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addRequests } from '../utils/requestSlice';
import { useNavigate } from 'react-router-dom';

const Requests = () => {
  const requests = useSelector((store)=>store.requests)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true})
      dispatch(addRequests(res.data.data))
    } catch (error) {
      console.log(error)
      navigate("/")
    }
  }

  useEffect(()=>{
    fetchRequests()
  },[])

  const reviewRequest = async (status,_id)=>{
    try {
      const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+ _id,{},{withCredentials:true})
      fetchRequests()
    } catch (error) {
      console.log(error)
    }
  }

  if(!requests) return
  if(requests.length<=0) return <div className='flex font-bold justify-center my-10'><h1>No New Requests</h1></div>
  return (
    <div className='text-center mb-20 my-10'>
      <h1 className='text-bold text-3xl'>Requests</h1>
      {requests.map((request)=>{
        const {_id} = request;
        const {firstName,lastName} = request.fromUserId;
        return(
          <>
          <div key={firstName} className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 text-center justify-between  mx-auto'>
            <p className='my-auto'>{firstName+" "+lastName}</p>
            <div className="card-actions justify-end">
            <button onClick={()=>reviewRequest("rejected",_id)}  className="btn btn-primary">Reject</button>
            <button onClick={()=>reviewRequest("accepted",_id)} className="btn btn-secondary">Accept</button>
          </div>
          </div>
          
          </>
        )
      })}
    </div>
  )
}

export default Requests
