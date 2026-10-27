import Header from "./Header";
import KartuFoto from "./KartuFoto";
import Counter from "./Counter";
import DaftarKategori from "./DaftarKategori";
import TestEffect from "./testEffect";

/*function App() {
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
}*/

function App() {
  return (
    <div>
      <Header />
      <DaftarKategori />
    </div>
  );
}


export default App;