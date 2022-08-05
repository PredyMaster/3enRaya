import { useState, useRef, useContext } from 'react';
import {AppContext} from '../provider/provider';


const Square = (props) => {
    const [jugadas, setJugadas] = useContext(AppContext);

    //const [newvalue, setnewValue] = useState({value: props.value});
    const [newvalue, setnewValue] = useState({value: '' });
    const [error, setError] = useState(false);
    const [hacerReset] = useState(props.reset)
    const ref = useRef(props.reset);

    //console.log(props, "props Square")

    /* useEffect(() => {
        console.log("AHORA RESETEO")
    }, [hacerReset]) */

    const handleClick = (props) => {
        setnewValue({value: props.jugador})

        let num = props.value

        console.log(props.value, typeof(props.value))

        let newArray = [...jugadas]
        newArray[num] = { id: props.value, jugador: props.jugador }
        setJugadas(newArray)

        //{value => <div>The answer is {value}.</div>}
        //setJugadas({ ...jugadas, 33 : { id: props.value, jugador: props.jugador }})
        //console.log(props)
        //let tablasBoard = props.numJugadas[0][0];
        //let numeroDeJugadas = props.numJugadas[0][0].numeroJugadas;
        //console.log(tablasBoard)
        //Actualizo el contador de jugadas
        //console.log(props.numJugadas[1])
        //props.numJugadas[1](2);
        //console.log("numeroDeJugadas: " + numeroDeJugadas);
       
        if(props.numJugadas[0] === 8){
            console.log("TABLAS");
        }
    }

    const jugada = (e) => {

        /* console.log("ref.current: " + ref.current);
        console.log("hacerReset: " + hacerReset); */
        
        if(props.ganador.victoria !== true){
            if(props.square == null){
                handleClick(props);
                props.actualiza(props.value);

                /* console.log("dentro " + props.ganador.jugada) */
            }else{
                setError(true);
                const quitarError = async () => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    setError(false);
                }
                quitarError();
            }
        }else{
            console.log(props.ganador.jugada);
        }         

        
    }

    return(
        <button className={error === false ? 'square' : 'square square_BorderError'} onClick={(e) => jugada(e) }>
            <span className={newvalue.value==='X' ? 'jugador1ICON' : 'jugador2ICON'}>{newvalue.value}</span>
        </button>
    )
}

export default Square;