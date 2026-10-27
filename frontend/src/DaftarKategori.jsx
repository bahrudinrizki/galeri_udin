import { useState, useEffect } from "react";

function DaftarKategori() {
  const [kategori, setKategori] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/kategori")
    .then((res) => res.json())
    .then((hasil) => setKategori(hasil))
    .catch((err) => console.log("gagal ambil data:", err));
  }, []);

  return (
    <div>
      <h2>Daftar Kategori</h2>
      <ul>
        {kategori.map((k) => (
          <li key={k.id_kategori}>{k.nama_kategori}</li>
        ))}
      </ul>
    </div>
  );
}

export default DaftarKategori;