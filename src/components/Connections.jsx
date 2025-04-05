import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
  const connections = useSelector((store)=>store.connection)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchConnections = async () =>{
    try {
      const res = await axios.get(BASE_URL+"/user/connections",{withCredentials:true})
      dispatch(addConnections(res.data.data))
    } catch (error) {
      console.log(error)
      navigate("/")
    }
  }

  useEffect(()=>{
    fetchConnections()
  },[])

  if(!connections) return
  if(connections.length<=0) return <div className='flex font-bold justify-center my-10'><h1>No Connections</h1></div>
  return (
    <div className='text-center mb-20 my-10'>
      <h1 className='text-bold text-3xl'>Connections</h1>
      {connections.map((connection)=>{
        const {firstName,lastName,photoUrl,age,gender,about} = connection;
        return(
          <div key={firstName} className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
            <p>{firstName+" "+lastName}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Connections
