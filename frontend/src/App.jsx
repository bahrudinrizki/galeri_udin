import Header from "./Header";
import KartuFoto from "./KartuFoto";
import Counter from "./Counter";
import DaftarKategori from "./DaftarKategori";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/kategori")
    .then((res) => res.json())
    .then((data) => console.log("Data dari backend:", data))
    .then((err) => console.log("Gagal:", err));
  }, []);

  return (
    <div>
      <h1>Tes koneksi</h1>
      <p>Buka console (f12) untuk melihat hasilnya</p>
    </div>
  );
}
/*
function App() {
  return (
    <div>
      <Header />
      <Counter/>
      <DaftarKategori/>
      <KartuFoto judul ="Pantai Sore" pengunggah ="Budi" />
      <KartuFoto judul ="Gunung Pagi" pengunggah ="Sari" />
      <KartuFoto judul ="Sawah Hijau" pengunggah ="Andi"/>
      <KartuFoto judul ="Design" pengunggah ="Udin"/>
    </div>
  );
}
*/
export default App;