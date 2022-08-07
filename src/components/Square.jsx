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
        newArray[num] = { id: value, jugador: jugador, winsGamer1: jugadas[0].winsGamer1, winsGamer2: jugadas[0].winsGamer2 }
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
                { !!jugadas[value]?.jugador ? jugadas[value].jugador : null }
            </span>
        </button>
    )
}

export default Square;