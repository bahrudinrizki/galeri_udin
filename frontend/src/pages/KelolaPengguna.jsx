import { useEffect, useState } from "react"

export default function KelolaPengguna() {
  const token = localStorage.getItem('token')
  const id_login = localStorage.getItem('id_pengguna')
  const [pengguna, setPengguna] = useState([])

  const ambilPengguna = async () => {
    try {
      const res = await fetch('http://localhost:3000/pengguna', {
        headers: { 'Authorization': `bearer ${token}` }
      })
      if (!res.ok) throw new Error('gagal mengambil pengguna')
      const data = await res.json()
      setPengguna(data)
    } catch (err) {
      console.error('Gagal fetch data:', err)
    }
  }

  useEffect(() => {
    ambilPengguna()
  }, [])

  const handleDelete = async (id_pengguna) => {
    const yakin = window.confirm('pengguna beserta semua fotonya akan dihapus, lanjutkan?')
    if (yakin) {
      try {
        const res = await fetch(`http://localhost:3000/pengguna/${id_pengguna}`, {
          method: 'DELETE',
          headers: { 'Authorization': `bearer ${token}` }
        })
        if (res.ok) {
          alert('pengguna berhasil dihapus')
          ambilPengguna()
        } else {
          const data = await res.json().catch(() => ({}))
          alert(data.error || 'gagal menghapus pengguna')
        }
      } catch (error) {
        console.error('error disini', error)
      }
    }
  }

  return (
    <div>
      <h1 className="h4 mb-4">Kelola Pengguna</h1>

      <div className="card">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>No HP</th>
                <th>Role</th>
                <th className="text-end">Kelola</th>
              </tr>
            </thead>
            <tbody>
              {pengguna.map((item, index) => (
                <tr key={item.id_pengguna}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.email}</td>
                  <td>{item.no_hp}</td>
                  <td>{item.role}</td>
                  <td className="text-end">
                    {String(item.id_pengguna) === id_login ? (
                      <small className="text-body-secondary">akun anda</small>
                    ) : (
                      <button type="button" className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id_pengguna)}>
                        Hapus
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {pengguna.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-body-secondary">
                    Belum ada pengguna
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}