import Kategori from "./Kategori";

function KartuFoto (props) {
  return (
    <div>
      <h3>{props.judul}</h3>
      <p>Oleh: {props.pengunggah}</p>
      <Kategori />
    </div>
  );
}

export default KartuFoto;