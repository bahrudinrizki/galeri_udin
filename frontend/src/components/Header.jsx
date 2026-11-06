import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate=useNavigate()
  const handleLogout=() =>{
    localStorage.removeItem("token")
    localStorage.removeItem("id_pengguna")
    navigate("/login")


  }

  return (<nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Galeri Uden</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to={'/'} className="nav-link active" aria-current="page" >Home</Link>
          </li>
          <li className="nav-item">
            <Link to={'/pengguna'} className="nav-link">Profile</Link>
          </li>
          <li className="nav-item">
            <Link to={'/galeri'} className="nav-link">Galeri</Link>
          </li>
          <li className="nav-item">
            <Link to={'/login'} className="nav-link">Login</Link>
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