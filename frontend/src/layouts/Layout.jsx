import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";



export default function Layout() {
  const token = localStorage.getItem('token')
  const navigate =useNavigate()
  useEffect(() =>{
    if (!token){
      navigate('/login')
    }
  },[token,navigate])
  return (
    <div className="wrapper">
      <Header/>
      <div className="container">
        <div className="row">
          <div className="col">
            <Outlet/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}