import { useEffect, useState } from "react"

export default function Home() {
  const token = localStorage.getItem('token')
  const id_login = localStorage.getItem('id_pengguna')
  const role = localStorage.getItem('role')
  const [feed, setFeed] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [komentar, setKomentar] = useState([])
  const [isiKomentar, setIsiKomentar] = useState("")

  const getFeed = async () => {
    try {
      const res = await fetch('http://localhost:3000/feed', {
        headers: { 'Authorization': `bearer ${token}` }
      })
      if (!res.ok) throw new Error('gagal mengambil feed')
      const data = await res.json()
      setFeed(data)
    } catch (error) {
      console.error('terjadi error waktu load feed', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  // ubah satu foto di dalam feed tanpa memuat ulang semuanya
  const ubahItem = (id_foto, perubahan) => {
    setFeed((lama) => lama.map((item) => (
      item.id_foto === id_foto ? { ...item, ...perubahan(item) } : item
    )))
  }

  const handleLike = async (id_foto) => {
    try {
      const res = await fetch(`http://localhost:3000/foto/${id_foto}/like`, {
        method: 'POST',
        headers: { 'Authorization': `bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        ubahItem(id_foto, (item) => ({
          sudah_like: data.liked ? 1 : 0,
          jumlah_like: item.jumlah_like + (data.liked ? 1 : -1)
        }))
      } else {
        alert('gagal memproses like')
      }
    } catch (error) {
      console.error('error disini', error)
    }
  }

  const getKomentar = async (id_foto) => {
    try {
      const res = await fetch(`http://localhost:3000/foto/${id_foto}/komentar`, {
        headers: { 'Authorization': `bearer ${token}` }
      })
      if (!res.ok) throw new Error('gagal mengambil komentar')
      const data = await res.json()
      setKomentar(data)
    } catch (error) {
      console.error('Gagal fetch data:', error)
    }
  }

  const handleOpenKomentar = (item) => {
    setSelected(item)
    setIsiKomentar("")
    setKomentar([])
    getKomentar(item.id_foto)
  }

  const handleClose = () => {
    setSelected(null)
    setKomentar([])
  }

  const handleKirimKomentar = async (e) => {
    e.preventDefault()
    if (!isiKomentar.trim()) {
      alert('isi komentar wajib diisi')
      return
    }
    try {
      const res = await fetch(`http://localhost:3000/foto/${selected.id_foto}/komentar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
        body: JSON.stringify({ isi_komentar: isiKomentar })
      })
      if (res.ok) {
        setIsiKomentar("")
        getKomentar(selected.id_foto)
        ubahItem(selected.id_foto, (item) => ({ jumlah_komentar: item.jumlah_komentar + 1 }))
      } else {
        const data = await res.json().catch(() => ({}))
        alert(data.message || 'gagal mengirim komentar')
      }
    } catch (error) {
      console.error('error disini', error)
    }
  }

  const handleHapusKomentar = async (id_komentar) => {
    const yakin = window.confirm('apakah komentar mau dihapus?')
    if (yakin) {
      try {
        const res = await fetch(`http://localhost:3000/komentar/${id_komentar}`, {
          method: 'DELETE',
          headers: { 'Authorization': `bearer ${token}` }
        })
        if (res.ok) {
          getKomentar(selected.id_foto)
          ubahItem(selected.id_foto, (item) => ({ jumlah_komentar: item.jumlah_komentar - 1 }))
        } else {
          alert('gagal menghapus komentar')
        }
      } catch (error) {
        console.error('error disini', error)
      }
    }
  }

  if (loading) {
    return <div className="container mt-4">Loading</div>
  }

  return (
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {feed.length > 0 ? (
            feed.map(item => (
              <div className="col" key={item.id_foto}>
                <div className="card">
                  <img
                    src={`http://localhost:3000/uploads/${item.nama_file}`}
                    className="card-img-top"
                    alt={item.judul}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.judul}</h5>
                    <small className="text-body-secondary mb-2">
                      {item.nama}{item.nama_kategori && ` - ${item.nama_kategori}`}
                    </small>
                    <p className="card-text">{item.deskripsi}</p>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className={item.sudah_like > 0 ? "btn btn-sm btn-primary" : "btn btn-sm btn-outline-secondary"}
                          onClick={() => handleLike(item.id_foto)}
                        >
                          {item.sudah_like > 0 ? 'Disukai' : 'Suka'} ({item.jumlah_like})
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleOpenKomentar(item)}>
                          Komentar ({item.jumlah_komentar})
                        </button>
                      </div>
                      <small className="text-body-secondary">
                        {new Date(item.tgl_unggah).toLocaleDateString("id-ID")}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))) : (
            <h2>belum ada foto</h2>
          )}
        </div>

        {selected && (
          <>
            <div className="modal d-block fade show" role="dialog" tabIndex={-1}>
              <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Komentar: {selected.judul}</h5>
                    <button type="button" className="btn-close" onClick={handleClose}></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleKirimKomentar} className="mb-3">
                      <textarea
                        className="form-control mb-2"
                        rows={2}
                        maxLength={500}
                        placeholder="Tulis komentar"
                        value={isiKomentar}
                        onChange={(e) => setIsiKomentar(e.target.value)}
                      />
                      <button type="submit" className="btn btn-primary">Kirim</button>
                    </form>

                    {komentar.length > 0 ? (
                      komentar.map((k) => (
                        <div className="komentar-item" key={k.id_komentar}>
                          <div className="d-flex justify-content-between">
                            <strong>{k.nama}</strong>
                            <small className="text-body-secondary">
                              {new Date(k.tgl_komentar).toLocaleDateString("id-ID")}
                            </small>
                          </div>
                          <p className="mb-1">{k.isi_komentar}</p>
                          {(String(k.id_pengguna) === id_login || role === 'admin') && (
                            <button type="button" className="btn btn-sm btn-danger" onClick={() => handleHapusKomentar(k.id_komentar)}>
                              Hapus
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-body-secondary mb-0">belum ada komentar</p>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Tutup</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}