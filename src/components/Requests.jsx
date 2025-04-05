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
  return (
    <div>
      
    </div>
  )
}

export default Requests
