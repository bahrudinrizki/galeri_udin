import { useEffect, useState } from "react"

export default function Pengguna() {
  const [formData, setFormData] = useState({
    "nama": "",
    "email": "",
    "password": "",
    "no_hp": ""
  })
  const id_pengguna = localStorage.getItem("id_pengguna")
  const token = localStorage.getItem("token")
  useEffect(() => {
    fetch(`http://localhost:3000/pengguna/${id_pengguna}`, {
      headers: { 'Authorization': `bearer ${token}` }
    })
      .then((res) => res.json())
      .then((hasil) => setFormData({ nama: hasil[0].nama, email: hasil[0].email, no_hp: hasil[0].no_hp, password: "" }))
  }, [])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })


  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/pengguna/${id_pengguna}`,
        {
          headers: { 'Authorization': `bearer ${token}` }, 'content-type': application,
          method: 'PUT',
          body: JSON.stringify(formData)
        })
      if (res.ok) {
        alert('profil berhasil diubah')
      } else {
        alert('profil gagal diubah')
      }
    }


    catch (error) {
      console.error('error di', error)

    }
  }
  return (
    <div className="card border-succes">
      <form onSubmit={handleUpdate}>
        <div className="card-header">Form Profile</div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="nama">Nama</label>
            <input type="text" className="form-control" name="nama" onChange={() => handleChange} value={formData.nama} />
          </div>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input type="text" className="form-control" name="email" onChange={() => handleChange} value={formData.email} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" onChange={() => handleChange} value={formData.password} />
          </div>
          <div className="form-group">
            <label htmlFor="no_hp">No hp</label>
            <input type="text" className="form-control" name="no_hp" onChange={() => handleChange} value={formData.no_hp} />
          </div>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary" type="submit" >Update Profil</button>
        </div>
      </form>
    </div>
  )
}
