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
  // if (galeri.length===0){
  //   return <div className="container mt-4">Tidak Ada Galeri</div>
  // }
  return (
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
        <button className="btn btn-primary">Tambah Foto</button>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {galeri.length > 0 ? (
            galeri.map(item => (
              <div className="col" key={item.id_foto}>
                <div className="card shadow-sm">

                  <div className="bd-placeholder-img card-img-top"></div>
                  <p className="card-text">
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