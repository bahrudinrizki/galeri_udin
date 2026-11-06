import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home"
import Pengguna from "./pages/Pengguna";
import Galeri from "./pages/Galeri";
import Login from "./pages/Login";
import Register from "./pages/Register";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="pengguna" element={<Pengguna />}></Route>
          <Route path="galeri" element={<Galeri />}></Route>
           <Route path="login" element={<Login />}>Login</Route>
            <Route path="register" element={<Register/>}>Login</Route>
        </Route>
       
      </Routes>
    </BrowserRouter>
  )
}