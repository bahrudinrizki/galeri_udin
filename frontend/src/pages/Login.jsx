import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const [formData, setFormData] = useState({
    email:"",
    password:"",
  })
  const navigate=useNavigate()
  const handleChange=(e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault() 
    try {
      const res= await fetch("http://localhost:3000/login", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData)
      })
      if (res.ok){
        const data = await res.json()
        if (data.token !=null || data.token===""){
          setFormData({
            email:"",
            password:""
          })
          localStorage.setItem('token',data.token)
          localStorage.setItem('id_pengguna',data.id_pengguna)
          alert('Berhasil Login')
          navigate('/')
        }else {
          alert('Login gagal')
        }
      }
      else{
        alert('Login gagal')
      }
    } catch (error) {
      console.error("error:",error)
      alert('terjadi kesalahan login')

    }
  }
  return (
    <main className="form-signin w-100 m-auto">
      <form>
        <img className="mb-4" src="../assets/brand/bootstrap-logo.svg" alt width={72} height={57} />
        <h1 className="h3 mb-3 fw-normal">Silahkan Login Dulu</h1>
        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" onChange={handleChange}/>
          <label htmlFor="floatingInput">Alamat Email</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={handleChange}/>
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-check text-start my-3">
          <input className="form-check-input" type="checkbox" defaultValue="remember-me" id="checkDefault" />
          <label className="form-check-label" htmlFor="checkDefault">
            Ingat aku
          </label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit" onClick={handleSubmit}>
          Log in
        </button>
        <div>
          <Link to={'/register'} className="btn btn-secondary w-100 py-2">Register</Link>
        </div>
        <p className="mt-5 mb-3 text-body-secondary">© 2017–2025</p>
      </form>
    </main>

  )
}