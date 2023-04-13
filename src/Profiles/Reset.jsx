import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Reset() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [token,setToken] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    async function handleReset(e) {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8000/api/v1/password/reset", {
                token: token,
                email: email,
                password: password,
            })
            navigate('/login')
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
                <label htmlFor="token">Token :</label>
                <input type="token" className="form-control" id="token" placeholder="Token" onChange={(e) => setToken(e.target.value)} value={token} autoComplete="off" />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">Email :</label>
                <input type="email" className="form-control" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} autoComplete="off" />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="password">Password :</label>
                <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="off" />
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
