import useAuth from "../hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"


const ProtectiveRoute = () => {
    const { accessToken } = useAuth()
    if (!accessToken) {
        return <Navigate to="/login" />
    }
    return <Outlet />
}

const AuthMiddleware = () => {
    const { accessToken } = useAuth()
    if (accessToken) {
        return <Navigate to="/" />
    }
    return <Outlet />
}