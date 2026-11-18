
import { useEffect, useState } from 'react'

export default function Kategori() {
  const [kategori, setKategori] = useState([])
  const [nama_kategori, setNamaKategori] = useState('')
  const [editId, setEditId] = useState(null)
  const token = localStorage.getItem('token')

  const ambilKategori = () => {
    fetch('http://localhost:3000/kategori', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setKategori(data))
      .catch(err => console.error(err))
  };

  useEffect(() => {
    ambilKategori()
  }, [])

  
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!nama_kategori.trim()) {
      alert('Nama kategori wajib diisi');
      return
    }

    const url = editId
      ? `http://localhost:3000/kategori/${editId}`
      : 'http://localhost:3000/kategori'

    const method = editId ? 'PUT' : 'POST'

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ nama_kategori })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message)
        setNamaKategori('')
        setEditId(null)
        ambilKategori()
      })
      .catch(err => console.error(err))
  }

  const handleEdit = (item) => {
    setNamaKategori(item.nama_kategori)
    setEditId(item.id_kategori)
  }

  const handleDelete = (id) => {
    if (!window.confirm('Yakin ingin menghapus kategori ini?')) return

    fetch(`http://localhost:3000/kategori/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || data.error);
        ambilKategori()
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Kelola Kategori</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-8 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Masukkan nama kategori"
              value={nama_kategori}
              onChange={(e) => setNamaKategori(e.target.value)}
            />
          </div>

          <div className="col-md-4 mb-2">
            <button type="submit" className="btn btn-primary w-100">
              {editId ? 'Simpan Perubahan' : 'Tambah Kategori'}
            </button>
          </div>
        </div>

        {editId && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setNamaKategori('');
              setEditId(null);
            }}
          >
            Batal Edit
          </button>
        )}
      </form>

      <div className="card">
        <div className="card-header">
          Daftar Kategori
        </div>

        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Kategori</th>
                <th>Kelola</th>
              </tr>
            </thead>

            <tbody>
              {kategori.map((item, index) => (
                <tr key={item.id_kategori}>
                  <td>{index + 1}</td>
                  <td>{item.nama_kategori}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id_kategori)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}

              {kategori.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center">
                    Belum ada kategori
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
