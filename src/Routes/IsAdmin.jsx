import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

export default function IsAdmin() {
    const [isAdmin, setIsAdmin] = useState(false)
    const token = localStorage.getItem("token")
    const isLogin = token ? true : false
    useEffect(() => {
        async function check() {
            try {
                const res = await axios.get("http://localhost:8080/api/v1/login", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.data.role === "admin") {
                    setIsAdmin(true)
                } else {
                    setIsAdmin(false)
                }
            }
             catch (e) {
                console.log(e)
            }
        }
        check()
    },[])
    return (
        isAdmin ? <Outlet /> : (isLogin ? <Outlet /> : <Navigate to='/login' />)
    )
}
