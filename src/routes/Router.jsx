import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Home from '../pages/Home'
import Register from '../pages/form/Register'
import Login from '../pages/form/Login'
import Budget from '../pages/Budget'
import Perfil from '../pages/Perfil'
import EditBudget from '../pages/EditBudget'
import BudgetId from '../pages/BudgetId'

import { useContext } from 'react'
import { Context } from '../context/AuthContext'


const Router = () => {
    const { auth } = useContext(Context)
    return (
        <BrowserRouter>
            <NavBar />
            <div className='limit'>
                <Routes >
                    <Route path='/' element={auth ? <Home /> : <h1>Faça login ou crie uma conta</h1>} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/budget' element={<Budget />} />
                    <Route path='/perfil' element={auth ? <Perfil /> : <Navigate to={'/login'} />} />
                    <Route path='/edit/:id' element={<EditBudget />} />
                    <Route path='/budget/:id' element={<BudgetId />} />

                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default Router
