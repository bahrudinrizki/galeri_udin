import Header from "./Header";
import KartuFoto from "./KartuFoto";
import Counter from "./Counter";

function App() {
  return (
    <div>
      <Header />
      <Counter/>
      <KartuFoto judul ="Pantai Sore" pengunggah ="Budi" />
      <KartuFoto judul ="Gunung Pagi" pengunggah ="Sari" />
      <KartuFoto judul ="Sawah Hijau" pengunggah ="Andi"/>
      <KartuFoto judul ="Design" pengunggah ="Udin"/>
    </div>
  );
}

export default App;