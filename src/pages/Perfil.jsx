import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { Context } from "../context/AuthContext"
import Message from "../components/Message"
import Button from "../components/Button"

const Perfil = () => {
    const { handleLogout, userLocal, setUser, user } = useContext(Context)
    const [data, setData] = useState([])
    const [typeMsg, setTypeMsg] = useState("")

    const [name, setName] = useState(null)
    const [company, setCompany] = useState(null)
    const [whats, setWhats] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPass, setConfirmpass] = useState(null)

    const navigate = useNavigate()


    const getUser = async () => {
        await fetch(`https://api-budget.onrender.com/api/user/${userLocal.userId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "auth-token": userLocal.token,
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                let auth = false

                if (data.error) {
                    setData(data.error)
                    setTypeMsg("error")
                }
                else {
                    auth = true
                    setData(data.msg)
                    setTypeMsg("success")
                    setUser(data.user)
                }
                setTimeout(() => {
                    if (!auth) {
                        setData(data.error)
                        setTypeMsg("error")
                    }
                    else {
                        auth = true
                        setUser(data.user)
                    }
                }, 1500);
            })
    }

    useEffect(() => {
        setName(user.name)
        setCompany(user.company)
        setWhats(user.whats)
    }, [user])

    useEffect(() => {
        getUser()
    }, [])


    const handleExit = () => {
        handleLogout()
        navigate('/login')
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const data = {
            id: user._id,
            name: name,
            company: company,
            whats: whats,
            password: password,
            confirmPass: confirmPass,
        }

        const jsonData = JSON.stringify(data)

        await fetch(`https://api-budget.onrender.com/api/user`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "auth-token": userLocal.token,
            },
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
                    setData(data.msg)
                    setTypeMsg("success")
                }

                setTimeout(() => {
                    if (!auth) {
                        setData([])
                    }
                    else {
                        navigate("/")
                    }
                }, 1000);
            })
    }

    if(!user) {
        return <p>carregando</p>
    }
    return (
        <div className='page'>
            <h1>Editar Perfil</h1>
            {data?.length > 0 && <Message msg={data} msgType={typeMsg} />}
            <form onSubmit={handleUpdate}>
                <div className='page-input'><label htmlFor="name">Nome completo</label>
                    <input type="text" id='name' name='name' placeholder='Digite seu nome' onChange={(e) => setName(e.target.value)} value={name || ""} /></div>

                <div className='page-input'><label htmlFor="company">Nome da empresa</label>
                    <input type="text" name='company' id='company' placeholder='Digite o nome da sua empresa' onChange={(e) => setCompany(e.target.value)} value={company || ""} /></div>

                <div className='page-input'><label htmlFor="whats">Telefone</label>
                    <input type="number" name="whats" id="whats" placeholder='Numero do celular' onChange={(e) => setWhats(e.target.value)} value={whats || ""} /></div>

                <div className='page-input'><label htmlFor="password">Nova senha</label>
                    <input type="text" name="password" id="password" placeholder='Digite uma senha' onChange={(e) => setPassword(e.target.value)} value={password || ""} /></div>

                <div className='page-input'><label htmlFor="confirmpass">Confirmar senha</label>
                    <input type="text" name="confirmpass" id="confirmpass" placeholder='Digite sua senha novamente' onChange={(e) => setConfirmpass(e.target.value)} value={confirmPass || ""} /></div>

                <Button msg={"Atualizar"} />
            </form>
            <Link to={`/perfil/${userLocal.userId}`} className="exit" onClick={() => handleExit()}> Sair</Link>
        </div>
    )
}

export default Perfil
