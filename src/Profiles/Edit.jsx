import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProfileEdit() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchProfile() {
      const response = await axios.get('http://localhost:8000/api/v1/profile',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setName(response.data.data.name)
      setEmail(response.data.data.email)
  } fetchProfile()
  }, [])

  async function handleEdit (e) {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:8000/api/v1/profile`, {
        name: name,
        email: email,
      }, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      navigate('/profile')
      setName(name)
      setEmail(email)
    } catch (error) {
      setError(error.response.data.errors)
    }
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <div className="card-header bg-dark text-white">
              Edit Profile
            </div>
            <div className="card-body">
              <form onSubmit={handleEdit}>
                <div className="mb-2">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="off" />
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="off" disabled/>
                {error && error}
                </div>
                <button type="submit" className="btn btn-dark">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}