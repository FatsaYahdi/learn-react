import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
    const [email,setEmail] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    async function handleReset(e) {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8000/api/v1/password/forgot", {
                email: email
            })
            navigate('/reset-password/reset')
        } catch (error) {
            setError(error.response.data.message)
        }
    }
  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6 mt-5">
        <div className="card">
          <div className="card-header bg-dark text-white">
            Reset Password
          </div>
          <div className="card-body">
            <form onSubmit={handleReset}>
              <div className="form-group mb-2">
                <label htmlFor="email">Email :</label>
                <input type="email" className="form-control" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} autoComplete="off" />
                {error && error}
              </div>
              <button type="submit" className="btn btn-dark me-2">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
