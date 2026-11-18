import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"

export default function AdminLayout() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  return (
    <div className="admin-layout">
      <Sidebar/>

      <div className="admin-content">
        <Outlet/>
      </div>
    </div>
  )
}