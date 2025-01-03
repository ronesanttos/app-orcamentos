import "./card.css"
import { FiTrash2 } from "react-icons/fi";
import {Link} from "react-router-dom"

const Card = ({ cliente, handleDelete }) => {
    return (
        <div className='container-card'>
            <div className="card-box">
                <div className="card-info">
                    {cliente.name_cliente && <h2><span>Cliente: </span>{cliente.name_cliente}</h2>}
                    {cliente.anddress && <p> <span>Endereço: </span>{cliente.anddress}</p>}
                </div>
                <div className="card-btns">
                   
                    <button className="pdf"><Link to={`/budget/${cliente._id}`}>ver mais</Link></button>
                    <button className="excluir" onClick={() => handleDelete(cliente._id)}><FiTrash2/></button>
                </div>
            </div>
        </div>
    )
}

export default Card
