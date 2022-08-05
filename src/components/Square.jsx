import { useState, useRef, useContext } from 'react'
import {AppContext} from '../provider/provider'


const Square = (props) => {
    const [jugadas, setJugadas] = useContext(AppContext)
    const [newvalue, setnewValue] = useState({value: '' })
    const [error, setError] = useState(false)
    const [hacerReset] = useState(props.reset)
    const ref = useRef(props.reset)






    const setPosition = (props) => {
        setnewValue({value: props.jugador})

        let num = props.value

        console.log(props.value, typeof(props.value))

        let newArray = [...jugadas]
        newArray[num] = { id: props.value, jugador: props.jugador }
        setJugadas(newArray)
       
        if(props.numJugadas[0] === 8){
            console.log("TABLAS");
        }
    }




    const move = e => {

        //Compruebo si es el ganador
        if(!props.ganador.victoria){
            console.log(props.square, " ------- props.square ")
            
            if(props.square === null){
                setPosition(props);
                props.actualiza(props.value)

            }else{
                setError(true);
                const quitarError = async () => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    setError(false);
                }
                quitarError();
            }

        }else{
            //Es ganador???
            console.log(props.ganador.jugada)
        }
        
    }

    return(
        <button className={!error ? 'square' : 'square square_BorderError'} onClick={ e => move(e) }>
            <span className={newvalue.value==='X' ? 'jugador1ICON' : 'jugador2ICON'}>{newvalue.value}</span>
        </button>
    )
}

export default Square;