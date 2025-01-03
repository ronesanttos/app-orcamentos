import { useParams, Link } from "react-router-dom"
import { Context } from "../context/AuthContext"
import { useContext, useState, useEffect } from "react"
import "./budgetId.css"
import { jsPDF } from "jspdf"

const BudgetId = () => {
    const { id } = useParams()
    const { userLocal } = useContext(Context)
    const [budget, setBudget] = useState([])
    const [data, setData] = useState([])
    const [typeMsg, setTypeMsg] = useState("")

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
                }, 1500);
            })
    }

    const gerarPDF = () => {
        if (!budget) {
            console.log("Sem dados para pdf")
            return
        }
        const doc = new jsPDF();

        // Definir estilo da tabela
        doc.setFontSize(12);

        // Definir os dados da tabela
        const dadosTabela = [
            ["Nome do Cliente", String(budget?.name_cliente)],
            ["Endereço", String(budget?.anddress)],
            ["Contato", String(budget?.contact)],
            ["Serviços", String(budget?.service)],
            ["Detalhes", String(budget?.details)],
            ["Metros", String(budget?.qtd)],
            ["Valor Total", String((budget?.unit_price * budget?.qtd).toFixed(2))]
        ];

      
        doc.save(`orcamento${id}.pdf`)
        console.log(dadosTabela)
    }


    useEffect(() => {
        getBudgetID()
    }, [])

    if (!budget) {
        return <p>Carregando</p>
    }
    return (
        <div className="container">
            {budget && <div className="box">
                <h2>Dados do orcamento</h2>
                <p>Nome do Cliente: <span>{budget?.name_cliente}</span></p>
                <p>Endereço: <span>{budget?.anddress}</span></p>
                <p>Contato: <span>{budget?.contact}</span></p>
                <p>Serviços: <span>{budget?.service}</span></p>
                <p>Detalhes: <span>{budget?.details}</span></p>
                <p>Metros:<span> {budget?.qtd}</span></p>
                <p>Valor total: <span>{budget?.unit_price * budget?.qtd}</span></p>
            </div>}
            <button className="btn edit"><Link to={`/edit/${budget._id}`}>Editar</Link></button>
            <button className="btn pdf" onClick={gerarPDF}>pdf</button>
        </div>
    )
}

export default BudgetId
