import { useEffect, useState } from "react"

export default function Dashboard() {
  const token = localStorage.getItem('token')
  const [jumlah, setJumlah] = useState({ pengguna: 0, foto: 0, kategori: 0 })

  useEffect(() => {
    const ambilData = async () => {
      try {
        const headers = { 'Authorization': `bearer ${token}` }
        const [resPengguna, resFoto, resKategori] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/pengguna`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL}/foto`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL}/kategori`, { headers }),
        ])
        if (!resPengguna.ok || !resFoto.ok || !resKategori.ok) {
          throw new Error('gagal mengambil data dashboard')
        }
        const pengguna = await resPengguna.json()
        const foto = await resFoto.json()
        const kategori = await resKategori.json()
        setJumlah({
          pengguna: pengguna.length,
          foto: foto.length,
          kategori: kategori.length,
        })
      } catch (error) {
        console.error('Gagal fetch data:', error)
      }
    }
    ambilData()
  }, [token])

  return (
    <div>
      <h1 className="h4 mb-4">Dashboard Admin</h1>
      <div className="row row-cols-1 row-cols-md-3 g-3">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="angka-dashboard">{jumlah.pengguna}</div>
              <div className="text-body-secondary">Pengguna</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="angka-dashboard">{jumlah.foto}</div>
              <div className="text-body-secondary">Foto</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="angka-dashboard">{jumlah.kategori}</div>
              <div className="text-body-secondary">Kategori</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}