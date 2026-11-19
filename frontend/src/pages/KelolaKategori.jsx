import { useEffect, useState } from 'react'

export default function KelolaKategori() {
  const [kategori, setKategori] = useState([])
  const [nama_kategori, setNamaKategori] = useState('')
  const [editId, setEditId] = useState(null)
  const token = localStorage.getItem('token')

  const ambilKategori = async () => {
    try {
      const res = await fetch('http://localhost:3000/kategori', {
        headers: { 'Authorization': `bearer ${token}` }
      })
      if (!res.ok) throw new Error('gagal mengambil kategori')
      const data = await res.json()
      setKategori(data)
    } catch (err) {
      console.error('Gagal fetch data:', err)
    }
  }

  useEffect(() => {
    ambilKategori()
  }, [])

  const handleReset = () => {
    setNamaKategori('')
    setEditId(null)
  }

  const handleEdit = (item) => {
    setNamaKategori(item.nama_kategori)
    setEditId(item.id_kategori)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!nama_kategori.trim()) {
      alert('nama kategori wajib diisi')
      return
    }

    const url = editId
      ? `http://localhost:3000/kategori/${editId}`
      : 'http://localhost:3000/kategori'
    const method = editId ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
        body: JSON.stringify({ nama_kategori })
      })
      if (res.ok) {
        alert(editId ? 'kategori berhasil diubah' : 'kategori berhasil ditambahkan')
        handleReset()
        ambilKategori()
      } else {
        alert('gagal menyimpan kategori')
      }
    } catch (error) {
      console.error('error disini', error)
    }
  }

  const handleDelete = async (id_kategori) => {
    const yakin = window.confirm('apakah data mau dihapus?')
    if (yakin) {
      try {
        const res = await fetch(`http://localhost:3000/kategori/${id_kategori}`, {
          method: 'DELETE',
          headers: { 'Authorization': `bearer ${token}` }
        })
        if (res.ok) {
          alert('kategori berhasil dihapus')
          if (editId === id_kategori) handleReset()
          ambilKategori()
        } else {
          const data = await res.json().catch(() => ({}))
          alert(data.error || 'gagal menghapus kategori')
        }
      } catch (error) {
        console.error('error disini', error)
      }
    }
  }

  return (
    <div>
      <h1 className="h4 mb-4">Kelola Kategori</h1>

      <form onSubmit={handleSubmit} className="d-flex gap-2 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Nama kategori"
          value={nama_kategori}
          onChange={(e) => setNamaKategori(e.target.value)}
        />
        <button type="submit" className="btn btn-primary text-nowrap">
          {editId ? 'Simpan' : 'Tambah'}
        </button>
        {editId && (
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Batal
          </button>
        )}
      </form>

      <div className="card">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Kategori</th>
                <th className="text-end">Kelola</th>
              </tr>
            </thead>
            <tbody>
              {kategori.map((item, index) => (
                <tr key={item.id_kategori}>
                  <td>{index + 1}</td>
                  <td>{item.nama_kategori}</td>
                  <td className="text-end">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleEdit(item)}>
                        Edit
                      </button>
                      <button type="button" className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id_kategori)}>
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {kategori.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-body-secondary">
                    Belum ada kategori
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