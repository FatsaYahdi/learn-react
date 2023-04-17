import axios from 'axios'
import React, { useState } from 'react'

export default function ResetPassword() {
    const [email,setEmail] = useState("")
    const [error, setError] = useState("")
    const [valid, setValid] = useState(true)
    async function handleReset(e) {
        e.preventDefault()
        try {
          await axios.post("http://localhost:8000/api/v1/password/forgot", {
            email: email
          })
          setValid(false)
        } catch (error) {
            setError(error.response.data.message)
        }
    }
  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6 mt-5">
        {valid ? (
        <div className="card">
          <div className="card-header bg-dark text-white">
            Reset Password
          </div>
          <div className="card-body">
            <form onSubmit={handleReset}>
              <div className="form-group mb-2">
                <label htmlFor="email">Email :</label>
                <input type="email" className="form-control" id="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} autoComplete="off" />
                {error && error}
              </div>
              <button type="submit" className="btn btn-dark me-2">Send</button>
            </form>
          </div>
        </div>
        ) : (
        <div className="card">
          <div className="card-header bg-success text-white">
            Info
          </div>
          <div className="card-body">
            <h5>Cek email mu klik reset jika masih tidak ada</h5>
            <span className='btn btn-secondary' onClick={handleReset}>Kirim Ulang</span>
          </div>
        </div>
        )}
      </div>
    </div>
  </div>
  )
}
