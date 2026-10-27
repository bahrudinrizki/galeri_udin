import { useState, useEffect } from "react";

function TesEffect() {
  const [angka, setAngka] = useState(0);

  useEffect(() => {
    console.log("useEffect jalan!");
  }, []);

  return (
    <div>
      <h2>Angka: {angka}</h2>
      <button onClick={() => setAngka(angka + 1)}>Tambah</button>
    </div>
  );
}

export default TesEffect;