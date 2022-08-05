import { createContext, useState } from 'react'

const Provider = ({ children }) => {
    /* const [state, setState] = useState([
        {id: 0, jugador: null},
        {id: 1, jugador: null},
        {id: 2, jugador: null},
        {id: 3, jugador: null},
        {id: 4, jugador: null},
        {id: 5, jugador: null},
        {id: 6, jugador: null},
        {id: 7, jugador: null},
        {id: 8, jugador: null}
    ]); */
    const [state, setState] = useState([])
    return (
        <AppContext.Provider value={[state, setState]}>
            {children}
        </AppContext.Provider>
    );
}

export default Provider
export const AppContext = createContext()