import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Galeri() {
  const token = localStorage.getItem('token')
  const id_pengguna = localStorage.getItem('id_pengguna')
  const [galeri, setGaleri] = useState([])
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [judul, setJudul] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [file, setFile] = useState(null)
  const [id_kategori, setId_kategori] = useState("")
  const [kategori, setKategori] = useState([])
  const [idFoto, setIdFoto] = useState("")
  const navigate = useNavigate()
  const [view, setView] = useState(false)
  const [selected, setSelected]= useState(null)

  useEffect(() => {
    fetch(`http://localhost:3000/kategori`, {
      headers: { 'Authorization': `bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setKategori(data))
      .catch((err) => console.error('Gagal fetch data:', err))
  }, [])

  const getGaleri = async () => {
    try {
      const res = await fetch(`http://localhost:3000/foto/${id_pengguna}`, {
        headers: { 'Authorization': `bearer ${token}` }
      }

      )
        .then((res) => res.json())
        .then((data) => setGaleri(data))


    } catch (error) {
      console.error('terjadi error waktu load data foto', error)
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getGaleri()
  }, [])




  if (loading) {
    return <div className="container mt-4">Loading</div>
  }
  const handleOpenAdd = () => {
    setIsEdit(false)
    setJudul("")
    setDeskripsi("")
    setFile("")
    setId_kategori("")
    setIdFoto("")
    setShow("true")
  }
  const handleOpenEdit = (item) => {
    setIsEdit(true)
    setJudul(item.judul)
    setDeskripsi(item.deskripsi)
    setFile("null")
    setId_kategori(item.id_kategori)
    setIdFoto(item.id_foto)
    setShow("true")
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFile(file)
  }



  const handleClose = () => { setShow(false) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isEdit) {
      if (!judul || !id_kategori) {
        alert('judul dan kategori wajib diisi')
      }
    } else {
      if (!judul || !id_kategori || !file) {
        alert('judul dan kategori dan foto wajib diisi')
      }
    }

    const formData = new FormData()
    formData.append("judul", judul)
    formData.append("deskripsi", deskripsi)
    formData.append("id_kategori", id_kategori)
    formData.append("id_pengguna", id_pengguna)
    formData.append("file", file)
    try {
      const url = isEdit ? `http://localhost:3000/foto/${idFoto}` : `http://localhost:3000/foto`
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method: method,
        body: formData,
        headers: { 'Authorization': `bearer ${token}` }
      })
      if (res.ok) {
        if (isEdit) {
          alert('galeri berhasil diubah')
        } else {
          alert('galeri berhasil disimpan')
        }
        setShow(false)
        getGaleri()
      }
      else {
        alert('gagal upload')
      }


    } catch (error) {
      console.error('error disini', error)

    }

  }

  const handleDelete = async (id_foto) => {
    const confirm = window.confirm('apakah data mau dihapus?')
    if (confirm) {
      const res = await fetch(`http://localhost:3000/foto/${id_foto}`, {
        headers: { 'Authorization': `bearer ${token}` },
        method: 'DELETE'
      })
      if (res.ok) {
        alert('galeri berhasil dihapus')
        getGaleri()
      }

    }
  }

  const handleView = (item) => {
    setSelected(item)
    setView(true)

  }

  const handleCloseView =() => {
    setView(false)
    setSelected(null)
  } 

  return (
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
        <button className="btn btn-primary" onClick={handleOpenAdd}>Tambah Foto</button>
        
        {show && (
          <>
            <div className="modal d-block fade show" role="dialog" tabIndex={-1} >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {isEdit ? 'Form Edit Galeri' : 'Form Tambah Galeri'}
                    </h5>
                    <button className="btn-close" onClick={handleClose}>Close</button>
                  </div>
                  <form onSubmit={handleSubmit} className="mt-3">
                    <div className="modal-body">
                      <div className="mb-3">
                        <label htmlFor="judul" className="label-name">
                          Judul
                        </label>
                        <input type="text" className="form-control" name="judul" value={judul} onChange={(e) => setJudul(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="deskripsi" className="label-name">
                          Deskripsi
                        </label>
                        <input type="text" className="form-control" name="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="file" className="label-name">
                          File
                        </label>
                        <input type="file" className="form-control" name="file" onChange={handleFileChange} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="kategori" className="label-name">
                          Kategori
                        </label>
                        <select name="id_kategori" id="id_kategori" className="form-select"
                          value={id_kategori} onChange={(e) => setId_kategori(e.target.value)}>
                          <option value="">Pilih Kategori</option>
                          {kategori.map((item) => (
                            <option key={item.id_kategori} value={item.id_kategori}>
                              {item.nama_kategori}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                      <button type="submit" className="btn btn-primary" >
                        {isEdit ? 'Update' : 'Save'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>

        )}

        {view && selected &&(
          <>
          <div className="modal d-block fade show" role="dialog" tabIndex={-1}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selected.judul}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseView}></button>
                </div>
                <div className="modal-body">
                  <img src={`http://localhost:3000/uploads/${selected.nama_file}`} alt={selected.judul} className="img-fluid" />
                  <p className="mt-3 mb-1">{selected.deskripsi}</p>
                  <small className="text-body-secondary">
                    {selected.nama_kategori} - {new Date(selected.tgl_unggah).toLocaleDateString("id-ID")}
                  </small>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseView}>Tutup</button>
                </div>
              </div>
            </div>
          </div>
          </>
        )}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {galeri.length > 0 ? (
            galeri.map(item => (
              <div className="col" key={item.id_foto}>
                <div className="card">
                  <img
                    src={`http://localhost:3000/uploads/${item.nama_file}`}
                    className="card-img-top"
                    alt={item.judul}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.judul}</h5>
                    <p className="card-text">{item.deskripsi}</p>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleView(item)}>View</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleOpenEdit(item)}>Edit</button>
                        <button type="button" className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id_foto)}>Delete</button>
                      </div>
                      <small className="text-body-secondary">
                        {new Date(item.tgl_unggah).toLocaleDateString("id-ID")}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))) : (
            <h2>tidak ada data</h2>
          )}

        </div>
      </div>
    </div>

  )
}