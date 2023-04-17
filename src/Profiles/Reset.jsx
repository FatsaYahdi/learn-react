import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Reset() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const [token, setToken] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const search = useLocation().search;
    const tokenParam = new URLSearchParams(search).get('token');
    const emailParam = new URLSearchParams(search).get('email');
    async function handleReset(e) {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8000/api/v1/password/reset", {
                token: token,
                email: email,
                password: password,
                password_confirmation: cpassword
            })
            navigate('/login')
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    useEffect(() => {
      setToken(tokenParam)
      setEmail(emailParam)
    },[])
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
                <input type="email" className="form-control" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={emailParam} autoComplete="off" />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="password">Password :</label>
                <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="off" />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="cpassword">Confirmation Password :</label>
                <input type="password" name="password_confirmation" className="form-control" id="cpassword" placeholder="Password Confirmation" onChange={(e) => setCpassword(e.target.value)} value={cpassword} autoComplete="off" />
              </div>
              <p>{error && error}</p>
              <button type="submit" className="btn btn-dark me-2">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
