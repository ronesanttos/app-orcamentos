import { createContext, useEffect, useState } from "react";

const Context = createContext()

function AuthProvider ({children}) {
    const [auth,setAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const [user,setUser] = useState([])

    const userLocalStorage = localStorage.getItem('user')
    const userLocal = JSON.parse(userLocalStorage)

    useEffect(() => {
        if(userLocal?.token) {
            setAuth(true)
        }

        else{
            setAuth(false)
        }
        setLoading(false)
    },[user])

    function handleLogout() {
        setAuth(false)
        localStorage.removeItem('user')
    }

    if(loading) {
        return <h1>Carregando...</h1>
    }

    return (
        <Context.Provider value={{auth,loading, user, userLocal, setUser,setLoading, setAuth, handleLogout}} >
            {children}
        </Context.Provider>
    )
}

export {Context, AuthProvider}