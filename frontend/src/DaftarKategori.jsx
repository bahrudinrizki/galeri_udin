import { useState, useEffect } from "react" ;

const API = "http://localhost:3000"



function DaftarKategori() {
  const [kategori, setKategori] = useState([]);
  const [namaBaru, setNamaBaru] = useState("");

  function ambilData() {
    fetch(`${API}/kategori`)
      .then((res) => res.json())
      .then((hasil) => setKategori(hasil))
      .catch((err) => console.log("Gagal ambil data:", err));
  }

  useEffect(() => {
    ambilData();
  }, []);

  function tambah(e) {
    e.preventDefault();
    if (namaBaru.trim() === " ") return;

    fetch(`${API}/kategori`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama_kategori: namaBaru }),
    })

      .then((res) => res.json())
      .then(() => {
        setNamaBaru(" ");
        ambilData();
      })
      .catch((err) => console.log("Gagal Tambah:", err));
  }

  return (
    <div>
      <h2> Daftar Kategori</h2>
      <p>Total: {kategori.length} kategori</p>

      <form onSubmit={tambah}>
        <input
          value={namaBaru}
          onChange={(e) => setNamaBaru(e.target.value)}
          placeholder="Nama Kategori Baru"
        />
        <button type="submit">Tambah</button>
      </form>


         {kategori.length === 0 ? <p>Belum ada kategori</p> : <p>Ada isinya</p>}
         {kategori.length > 10 && <p>Banyak Sekali</p>}


      <ul>
        {kategori.map((k) => (
          <li key={k.id_kategori}>{k.nama_kategori}</li>
        ))}
      </ul>
    </div>
  )
}

export default DaftarKategori;