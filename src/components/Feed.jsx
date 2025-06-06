import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store)=>store.feed)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    getFeed();
  },[])

  const getFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(BASE_URL+"/feed",{withCredentials:true})
      console.log(res)
      dispatch(addFeed(res?.data?.data))
    } catch (error) {
      console.log(error);
      navigate("/")
    }
  }

  if(!feed) return
  if(feed.length<=0) return <div className='flex justify-center font-bold my-10'><h1>No New Users</h1></div>
  return (
    <>
    {feed && (<div className='flex justify-center my-10'>
      <UserCard user={feed[0]}/>
    </div>)}
    </>
  )
}

export default Feed
