import { useEffect, useState, useContext } from "react"
import { Context } from "../context/AuthContext"
import Card from "../components/Card"
import { Link } from "react-router-dom"

const Home = () => {
  const [data, setData] = useState([])
  const [typeMsg, setTypeMsg] = useState("")
  const { userLocal, isLoading } = useContext(Context)
  
  const getBudgets = async () => {
    await fetch("https://api-budget.onrender.com/api/budget/my_budgets", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token": userLocal.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    setTimeout(() => {
      getBudgets()
    }, 100);
  }, [])

  const handleDelete = async (id) => {
    const data = {
      id: id,
      userId: userLocal.userId
    }

    const jsonData = JSON.stringify(data)

    await fetch("https://api-budget.onrender.com/api/budget/", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token": userLocal.token,
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
          getBudgets()
        }
        setData([])
      })
  }
  if (isLoading) {
    return <p>Carregando</p>
  }
  return (
    <div className="home">
      <h1>Meus Orcamentos  </h1>
      {data?.budget?.length == 0 && <p>Não há orcamentos, <Link to={"/budget"}>clique aqui para criar orcamentos.</Link></p>}
      {
        data && data?.budget?.map((budget, index) => (
          <Card key={index} cliente={{ ...budget }} handleDelete={handleDelete} />
        ))
      }
    </div>
  )
}

export default Home
