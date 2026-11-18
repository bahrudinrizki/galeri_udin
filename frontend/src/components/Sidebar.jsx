import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id_pengguna')
    localStorage.removeItem('role')
    navigate("/login")
  }

  return (
    <aside className="admin-sidebar">
      <h5 className="mb-4">Galeri Uden</h5>
      <nav className="d-flex flex-column gap-2">
        <NavLink to="/admin" end className="admin-link">
          Dashboard 
        </NavLink>
        <NavLink to="/admin/kategori" className="admin-link">
        Kelola Kategori
        </NavLink>
         <NavLink to="/admin/pengguna" className="admin-link">
        Kelola Pengguna
        </NavLink>
      </nav>

      <button className="btn btn-danger mt-auto" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  )
}