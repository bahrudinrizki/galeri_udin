import Header from "./Header";
import KartuFoto from "./KartuFoto";
import Counter from "./Counter";
import DaftarKategori from "./DaftarKategori";

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

export default App;