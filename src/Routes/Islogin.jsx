import { Navigate, Outlet } from "react-router-dom"

export default function IsLogin() {
    let isLogin = localStorage.getItem('token')
    return (
        !isLogin ? <Outlet /> : <Navigate to='/' />
    )
}
