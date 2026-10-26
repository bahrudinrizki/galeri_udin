import { useState } from "react";

function Counter() {
  const [angka, setAngka] = useState(0);

  return (
    <div>
      <h2>Angka: {angka}</h2>
      <button onClick={() => setAngka(angka + 1)}> Tambah </button>
      <button onClick={() => { if (angka > 0) setAngka(angka - 1)}}> Kurang </button>
      <button onClick={() => setAngka(0)}>Reset</button>
    </div>
  );
}

export default Counter;