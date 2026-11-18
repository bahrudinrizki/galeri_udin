import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("id_pengguna")
    localStorage.removeItem("role")
    navigate("/login")


  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info shadow-sm py-3">
      <div className="container">
        <a className="navbar-brand" href="#">Galeri Uden</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={'/'} className="nav-link" aria-current="page" >Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/pengguna'} className="nav-link">Profile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/galeri'} className="nav-link">Galeri</NavLink>
            </li>

            <li className="nav-item">
              <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>


  );
}