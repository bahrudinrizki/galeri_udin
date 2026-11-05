import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";



export default function Layout() {
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