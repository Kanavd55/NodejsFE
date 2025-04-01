import React, { use, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';
import axios from 'axios';

const EditProfile = ({user}) => {
    const [firstName,setFirstName] = useState(user.firstName)
    const [lastName,setLastName] = useState(user.lastName)
    const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
    const [age,setAge] = useState(user.age)
    const [gender,setGender] = useState(user.gender);
    const [about,setAbout] = useState(user.about)
    const [error,setError] = useState(user.error)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const saveProfile = async () => {
        setError("")
        try {
            const res = await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,photoUrl,age,gender,about},{withCredentials:true})
            dispatch(addUser(res?.data?.data))
        } catch (error) {
            console.log(error)
            navigate("/")
        }
    }
  return (
    <div className='flex justify-center my-10'>
        <div className='flex justify-center flex-row mx-10'>
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
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">PhotoUrl</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              value={photoUrl}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setPhotoUrl(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Age</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              value={age}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setAge(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">About</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              value={about}
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setAbout(e.target.value)}
            />
          </label>
        </div>
        <div className="card-actions justify-end">
            <button onClick={saveProfile} className="btn btn-primary">Save Profile</button>
          </div>
        <UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
    </div>
  )
}

export default EditProfile
