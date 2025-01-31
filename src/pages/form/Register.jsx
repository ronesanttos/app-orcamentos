import { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Context } from "../../context/AuthContext"
import Button from '../../components/Button'
import "../pages.css"
import Message from "../../components/Message"

const Register = () => {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [company, setCompany] = useState(null)
    const [whats, setWhats] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPass, setConfirmpass] = useState(null)

    const [data, setData] = useState([])
    const [typeMsg, setTypeMsg] = useState("")
    const { setUser } = useContext(Context)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            name: name,
            email: email,
            company: company,
            whats: whats,
            password: password,
            confirmPass: confirmPass
        }
        const jsonData = JSON.stringify(data)

        await fetch("https://api-budget.onrender.com/api/auth/register", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: jsonData
        })

        .then((res) => res.json())
        .then((data) => {
            let auth = false

            if(data.error) {
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
                if(!auth) {
                    setData([])
                }
                else {
                    navigate("/")
                    auth = true
                }
            }, 2500)
        })
    }
    return (
        <div className='page'>
            <h1>Criar conta</h1>
            {data.length > 0 && <Message msg={data} msgType={typeMsg} />}
            <form onSubmit={handleSubmit}>
                <div className='page-input'><label htmlFor="name">Nome completo</label>
                    <input type="text" id='name' name='name' placeholder='Digite seu nome' onChange={(e) => setName(e.target.value)} value={name || ""} /></div>

                <div className='page-input'><label htmlFor='email'>
                    E-mail</label><input type="email" id='email' name='email' placeholder='Digite seu e-mail' onChange={(e) => setEmail(e.target.value)} value={email || ""} /></div>

                <div className='page-input'><label htmlFor="company">Nome da empresa</label>
                    <input type="text" name='company' id='company' placeholder='Digite o nome da sua empresa' onChange={(e) => setCompany(e.target.value)} value={company || ""} /></div>

                <div className='page-input'><label htmlFor="whats">Telefone</label>
                    <input type="number" name="whats" id="whats" placeholder='Numero do celular' onChange={(e) => setWhats(e.target.value)} value={whats || ""} /></div>

                <div className='page-input'><label htmlFor="password">Senha</label>
                    <input type="text" name="password" id="password" placeholder='Digite uma senha' onChange={(e) => setPassword(e.target.value)} value={password || ""} /></div>

                <div className='page-input'><label htmlFor="confirmpass">Confirmar senha</label>
                    <input type="text" name="confirmpass" id="confirmpass" placeholder='Digite sua senha novamente' onChange={(e) => setConfirmpass(e.target.value)} value={confirmPass || ""} /></div>

                <Button msg={"Criar"} />
            </form>
        </div>
    )
}

export default Register
