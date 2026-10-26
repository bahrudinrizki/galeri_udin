import Header from "./Header";
import KartuFoto from "./KartuFoto";

function App() {
  return (
    <div>
      <Header />
      <KartuFoto judul ="Pantai Sore" pengunggah ="Budi" />
      <KartuFoto judul ="Gunung Pagi" pengunggah ="Sari" />
      <KartuFoto judul ="Sawah Hijau" pengunggah ="Andi"/>
      <KartuFoto judul ="Design" pengunggah ="Udin"/>
    </div>
  );
}

export default App;