import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProfileShow() {
  const token = localStorage.getItem('token')
  const [profile, setProfile] = useState([])
  const navigate = useNavigate()
  function handleEdit (e) {
    e.preventDefault()
    navigate('/profile/edit')
  }
  useEffect(() => {
    async function fetchProfile() {
      const response = await axios.get('http://localhost:8000/api/v1/profile',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProfile(response.data.data)
  } fetchProfile()
  }, [])
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <div className="card-header bg-dark text-white">
              Profile
            </div>
            <div className="card-body">
              <div className="mb-2 fs-3">{profile.name}</div>
              <div className="mb-2">{profile.email}</div>
              <button className="btn btn-dark" onClick={handleEdit}>Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}