import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Register() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    no_hp: "",
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/pengguna`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        alert('Berhasil Register, silahkan login')
        navigate('/login')
      } else {
        const data = await res.json()
        alert(data.message || 'Register gagal')
      }
    } catch (error) {
      console.error("error:", error)
      alert('terjadi kesalahan register')
    }
  }
  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit}>
        <img className="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width={72} height={57} />
        <h1 className="h3 mb-3 fw-normal">Form Register</h1>
        <div className="form-floating">
          <input type="text" className="form-control" id="inputNama" placeholder="Masukkan Nama" name="nama" value={formData.nama} onChange={handleChange} required />
          <label htmlFor="inputNama">Nama Pengguna</label>
        </div>
        <div className="form-floating">
          <input type="email" className="form-control" id="inputEmail" placeholder="name@example.com" name="email" value={formData.email} onChange={handleChange} required />
          <label htmlFor="inputEmail">Alamat Email</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="inputPassword" placeholder="Password" name="password" value={formData.password} onChange={handleChange} minLength={6} required />
          <label htmlFor="inputPassword">Password</label>
        </div>
        <div className="form-floating">
          <input type="tel" className="form-control" id="inputNoHp" placeholder="Masukkan Nomor HP" name="no_hp" value={formData.no_hp} onChange={handleChange} />
          <label htmlFor="inputNoHp">Nomor HP</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Register
        </button>
        <Link to={'/login'} className="btn btn-secondary w-100 py-2">Login</Link>
        <p className="mt-5 mb-3 text-body-secondary">© 2017–2025</p>
      </form>
    </main>

  )
}