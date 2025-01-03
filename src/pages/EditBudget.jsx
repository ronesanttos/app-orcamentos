import Button from "../components/Button"
import Message from "../components/Message"
import { useState, useContext, useEffect } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"

import { Context } from "../context/AuthContext"

const EditBudget = () => {

  const { userLocal } = useContext(Context)
  const { id } = useParams()

  const [budget, setBudget] = useState([])
  const [name_cliente, setNameCliente] = useState(null)
  const [anddress, setAnddress] = useState(null)
  const [contact, setContact] = useState(null)
  const [service, setService] = useState(null)
  const [details, setDetails] = useState(null)
  const [unit_price, setUnitPrice] = useState(null)
  const [qtd, setQtd] = useState(null)

  const [data, setData] = useState([])
  const [typeMsg, setTypeMsg] = useState("")
  const navigate = useNavigate()

  const getBudgetID = async () => {
    await fetch(`https://api-budget.onrender.com/api/budget/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        'auth-token': userLocal.token
      },
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
          setBudget(data.budget)
        }
        setTimeout(() => {
          if (!auth) {
            setData(data.error)
            setTypeMsg("error")
          }
          else {
            auth = true
            setBudget(data.budget)
          }
        }, 1000);
      })
  }

  useEffect(() => {
    setNameCliente(budget?.name_cliente)
    setAnddress(budget?.anddress)
    setContact(budget?.contact)
    setService(budget?.service)
    setDetails(budget?.details)
    setUnitPrice(budget?.unit_price)
    setQtd(budget?.qtd)
  }, [budget])


  const handleUpdateBudget = async (e) => {
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

    await fetch(`https://api-budget.onrender.com/api/budget/${id}`, {
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
          setBudget(data.budget)
          navigate(`/budget/${id}`)
        }
        setTimeout(() => {
          if (!auth) {
            setData([])
          }
          else {
            setBudget(data.budget)
            navigate(`/budget/${id}`)

          }
        }, 1500);
      })

  }

  useEffect(() => {
    getBudgetID()
  }, [])

  return (
    <div className='page'>
      <h1>Editar Orçamento</h1>
      <form onSubmit={handleUpdateBudget}>
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

        <Button msg={"Editar"} />
      </form>
    </div>
  )
}

export default EditBudget
