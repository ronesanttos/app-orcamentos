import { useState, useContext } from "react"
import { Context } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import Button from "../components/Button"
import Message from "../components/Message"


const Budget = () => {
    const { userLocal } = useContext(Context)

    const [name_cliente, setNameCliente] = useState(null)
    const [anddress, setAnddress] = useState(null)
    const [contact, setContact] = useState(null)
    const [service, setService] = useState(null)
    const [details, setDetails] = useState(null)
    const [unit_price, setUnitPrice] = useState(null)
    const [qtd, setQtd] = useState(null)

    const [data, setData] = useState([])
    const [typeMsg, setTypeMsg] = useState("")

    const id = uuidv4()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            name_cliente: name_cliente,
            anddress: anddress,
            contact: contact,
            service: service,
            details: details,
            unit_price: unit_price,
            qtd: qtd,
            _id: id
        }

        const jsonData = JSON.stringify(data)
        await fetch("https://api-budget.onrender.com/api/budget/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "auth-token": userLocal.token
            },
            body: jsonData
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setData(data.error)
                    setTypeMsg("error")
                }
                else {
                    setData(data.msg)
                    setTypeMsg("success")
                }
                setTimeout(() => {
                    setData([])
                    if (!data.error) {
                        navigate('/')
                    }
                }, 2000)
            })
    }

    return (
        <div className='page'>
            <h1>Criar Orçamento</h1>
            {data.length > 0 && <Message msg={data} msgType={typeMsg} />}
            <form onSubmit={handleSubmit}>
                <div className='page-input'><label htmlFor="name_cliente">Nome do cliente</label>
                    <input type="text" name='name_cliente' id="name_cliente" onChange={(e) => setNameCliente(e.target.value)} value={name_cliente || ""} />
                </div>

                <div className="page-input"><label htmlFor="anddress">Endereco</label>
                    <input type="text" name='anddress' id='anddress' onChange={(e) => setAnddress(e.target.value)} value={anddress || ""} />
                </div>

                <div className="page-input"><label htmlFor="contact">Contato</label>
                    <input type="number" name='contact' id='contact' onChange={(e) => setContact(e.target.value)} value={contact || ""} /> </div>

                <div className="page-input"><label htmlFor="service">Serviços</label>
                    <input type="text" name="service" id="service" onChange={(e) => setService(e.target.value)} value={service || ""} /></div>

                <div className="page-input"><label htmlFor="details">Descrição</label>
                    <input type="text" name="details" id="details" onChange={(e) => setDetails(e.target.value)} value={details || ""} /></div>

                <div className="page-input"><label htmlFor="unit_price">Preco</label>
                    <input type="number" name='unit_price' id='unit_price' onChange={(e) => setUnitPrice(e.target.value)} value={unit_price || ""} /></div>

                <div className="page-input"><label htmlFor="qtd">Quantidade</label><input type="number" name='qtd' id='qtd' onChange={(e) => setQtd(e.target.value)} value={qtd || ""} /></div>

                <Button msg={"Criar"} />
            </form>
        </div>
    )
}

export default Budget
