import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home"
import Pengguna from "./pages/Pengguna";
import Galeri from "./pages/Galeri";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import Kategori from "./pages/Kategori";





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
            <Route index element={<h2>Dashboard Admin</h2>} />
            <Route path="kategori" element={<Kategori/>} />
            <Route path="pengguna" element={<h2>Kelola Pengguna</h2>} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}