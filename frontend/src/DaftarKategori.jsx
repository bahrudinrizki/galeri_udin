import { useState } from "react";

function DaftarKategori() {
  const [kategori, setKategori] = useState([
    {id : 1, nama: "Alam"},
    {id : 2, nama: "Kuliner"},
    {id : 3, nama: "Hewan"},
    {id : 4, nama: "Olahraga"},
  ]);

  function hapus(idYangDihapus) {
    const sisa = kategori.filter((k) => k.id !== idYangDihapus);
    setKategori(sisa);
  }
  return (
    <div>
      <h2> Daftar Kategori</h2>
      <ul>
        {kategori.map((k) => (
          <li key={k.id}>
            {k.nama}{" "}
            <button onClick={() => hapus(k.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DaftarKategori;