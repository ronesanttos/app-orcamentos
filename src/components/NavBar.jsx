import { Link } from "react-router-dom"
import "./NavBar.css"
import { Context } from "../context/AuthContext"
import { useContext } from "react"

const NavBar = () => {
    const { auth } = useContext(Context)

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to={"/"}>Inicio</Link></li>
                    {!auth && <>
                        <li><Link to={"/register"}>Cadastrar</Link></li>
                        <li><Link to={"/login"}>Entrar</Link></li>
                    </>}
                    {auth && <>
                        <li><Link to={"/budget"}>Criar Pedido</Link></li>
                        <li><Link to={"/perfil"}>Perfil</Link></li>


                    </>}
                </ul>
            </nav>
        </header>
    )
}

export default NavBar
