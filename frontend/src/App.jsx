import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Pengguna from "./pages/Pengguna";
import Galeri from "./pages/Galeri";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import KelolaPengguna from "./pages/KelolaPengguna";
import KelolaKategori from "./pages/KelolaKategori";






export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="pengguna" element={<Pengguna />}></Route>
          <Route path="galeri" element={<Galeri />}></Route>
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout/>}>
            <Route index element={<Dashboard/>} />
            <Route path="kategori" element={<KelolaKategori/>} />
            <Route path="pengguna" element={<KelolaPengguna/>} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}