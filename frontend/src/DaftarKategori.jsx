import { useState, useEffect } from "react";

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
          <li key={k.id_kategori}>
            {idEdit === k.id_kategori ? (
              <>
              <input
               value={namaEdit}
               onChange={(e) => setNamaEdit(e.target.value)}
               />{" "}
               <button onClick={() => simpanEdit(k.id_kategori)}>Simpan</button>{" "}
               <button onClick={batalEdit}>Batal</button>
               </>
            ) : (
              <>
              {k.nama_kategori}{" "}
              <button onClick={() => mulaiEdit(k)}>Edit</button>{" "}
              <button onClick={() => hapus(k.id_kategori)}>Hapus</button>
              </>
            )}

          </li>
        ))}
      </ul>
    </div>
  )

 function hapus(id) {
  if (!window.confirm("Yakin mau menghapus kategori ini?")) return;

  fetch(`${API}/kategori/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((hasil) => {
      if (hasil.error) {
        alert("Gagal menghapus: " + hasil.error);
        return;
      }
      ambilData();
    })
    .catch((err) => console.log("Gagal hapus:", err));
}

function mulaiEdit(k) {
  setIdEdit(k. id_kategori);
  setNamaEdit(k.nama_kategori);
}

function batalEdit() {
  setIdEdit(null);
  setNamaEdit(" ");
}

function simpanEdit(e) {
  if (namaEdit.trim() === "") return;

  fetch(`${API}/kategori/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ nama_kategori: namaEdit}),
  })
    .then((res) = res.json())
    .then((hasil) => {
      if (hasi.error) {
        alert("Gagal mengubah:" + hasil.error);
        return;
      }
      batalEdit();
      ambilData();
    })
    .catch((err) => console.log ("Gagal edit:", err));
}

}
export default DaftarKategori;