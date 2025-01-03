import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../../context/AuthContext"
import Message from "../../components/Message"
import Button from "../../components/Button"
import "./login.css"

const Login = () => {

  const { setUser } = useContext(Context)
  const navigate = useNavigate()

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [data, setData] = useState([])
  const [typeMsg, setTypeMsg] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      email: email,
      password: password
    }

    const jsonData = JSON.stringify(data)

    await fetch("https://api-budget.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: jsonData
    })
      .then((res) => res.json())
      .then((data) => {

        let auth = false

        if (data.error) {
          setData(data.error)
          setTypeMsg("error")
        }

        else {
          auth = true
          setUser(localStorage.setItem('user', JSON.stringify(data)))
          setData(data.msg)
          setTypeMsg("success")
        }
        setTimeout(() => {
          if (!auth) {
            setData([])
            navigate("/login")
          }
          else {
            navigate('/')
          }
        }, 2500);
      })
  }
  return (
    <div className='login'>
      {data.length > 0 && <Message msg={data} msgType={typeMsg} />}
      <h1>Login</h1>
      <form onSubmit={handleSubmit} >
        <div className="login-input">
          <label htmlFor="email">E-mail</label>
          <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email || ""} placeholder="Seu e-mail" /></div>

        <div className="login-input"><label htmlFor="password">Senha</label>
          <input type="text" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Sua senha" /></div>
        <Button msg={"Entrar"} />

      </form>
      <p>Esqueceu a senha? <a href="#" >Clique aqui.</a></p>
    </div>
  )
}

export default Login
