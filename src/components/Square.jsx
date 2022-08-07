import { useState, useRef, useContext } from 'react'
import {AppContext} from '../provider/provider'


const Square = ({ value, square, actualiza, jugador, ganador, numJugadas }) => {
    const [jugadas, setJugadas] = useContext(AppContext)
    const [newvalue, setnewValue] = useState({value: '' })
    const [error, setError] = useState(false)

    const setPosition = () => {
        setnewValue({value: jugador})

        let num = value
    
        let newArray = [...jugadas]
        console.log(jugadas, " jugadas ")
        console.log(newArray, " newArray ")
        newArray[0][num] = { id: value, jugador: jugador }
        setJugadas(newArray)
       
        if(numJugadas[0] === 8){
            console.log("TABLAS");
        }
    }


    const move = e => {

        //Compruebo si es el ganador
        if(!ganador.victoria){
            
            if(square === null){
                setPosition();
                actualiza(value)

            }else{
                setError(true);
                const quitarError = async () => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    setError(false);
                }
                quitarError();
            }

        }
        
    }

    return(
        <button className={!error ? 'square' : 'square square_BorderError'} onClick={ e => move(e) }>
            <span className={newvalue.value==='X' ? 'jugador1ICON' : 'jugador2ICON'}>
                { !!jugadas[0][value]?.jugador ? jugadas[0][value].jugador : null }
            </span>
        </button>
    )
}

export default Square;