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
    setFile("null")
    setId_kategori("")
    setIdFoto("")
    setShow("true")
  }
  const handleOpenEdit = (item) => {
    setIsEdit(true)
    setJudul("item.judul")
    setDeskripsi("item.deskripsi")
    setFile("null")
    setId_kategori("item.id_kategori")
    setIdFoto("item.id_foto")
    setShow("true")
  }
  const handleFileChange=(e)=> {
    const file=e.target.files[0]
    setFile(file)
  } 

  const handleClose=()=>{setShow(false) }

  return (
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
        <button className="btn btn-primary" onSubmit={""} onClick={handleOpenAdd}>Tambah Foto</button>
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
                  <form onSubmit={""} className="mt-3">
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
                        <input type="text" className="form-control" name="file" value={file} onChange={handleFileChange} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="kategori" className="label-name">
                          Kategori
                        </label>
                        <select name="id_kategori" id="id_kategori" className="form-control" onChange={(e) => setId_kategori(e.target.value)}>
                          <option value="">Pilih Kategori</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                      <button className="btn btn-primary">
                        {isEdit ? 'Update' : 'Save'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>

        )}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {galeri.length > 0 ? (
            galeri.map(item => (
              <div className="col" key={item.id_foto}>
                <div className="card shadow-sm">

                  <div className="bd-placeholder-img card-img-top"></div>
                  <p className="card-title">
                    {item.judul}
                  </p>

                  <img src={`http://localhost:3000/uploads/${item.nama_file}`} alt="" />
                  <div className="card-body">
                    <p className="card-text">
                      {item.deskripsi}
                    </p>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                          View
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                          Edit
                        </button>

                      </div>
                      <small className="text-body-secondary">9 mins</small>
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