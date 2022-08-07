import { useState, useContext } from 'react'
import Square from './Square'
import { AppContext } from '../provider/provider'
import { styles } from '../css/estilosJS'

const Board = () => {
    const [estado, setEstado] = useContext(AppContext)
    const [ganador, setGanador] = useState([{ victoria: false, gamer: 'X', jugada: [0, 0, 0] }])
    const [numJugadas, setNumJugadas] = useState([{ tablas: false, numeroJugadas: 0 }])
    const [jugador, setJugador] = useState('X')
    const [disparaReset, setDisparaReset] = useState(false)
    const [misCajas, setMisCajas] = useState([
        { id: 0, square: null },
        { id: 1, square: null },
        { id: 2, square: null },
        { id: 3, square: null },
        { id: 4, square: null },
        { id: 5, square: null },
        { id: 6, square: null },
        { id: 7, square: null },
        { id: 8, square: null }
    ])


    const actualizaMarcador = id => {

        if (!ganador.victoria) {
            let arrayPosiciones = [...misCajas]
            let nuevasPosiciones = arrayPosiciones.map(x => {
                if (x.id === id) x.square = jugador
                
                return x
            })

            let proxValor = numJugadas[0].numeroJugadas
            proxValor++
            
            setMisCajas(nuevasPosiciones)


            if(comprobarVictoria()[0]){
                console.log("HE GANADO Y SOY " + jugador)

                let newArray = [...estado]
                
                let ArrayGanador = jugador === 'X' ? 
                {winsGamer1: newArray[1].winsGamer1 + 1, winsGamer2: newArray[1].winsGamer2} 
                : {winsGamer1: newArray[1].winsGamer1, winsGamer2: newArray[1].winsGamer2 +1} 
                newArray[1] = ArrayGanador
                
                console.log(ArrayGanador, " ArrayGanador ")

                setEstado(newArray)
                
            } 

            jugador === 'X' ? setJugador('O') : setJugador('X')
            setGanador({    victoria: comprobarVictoria()[0], 
                            gamer: jugador, 
                            jugada: comprobarVictoria()[1] 
            })


            //setEstado( estado.push({winGamer1: 1, winGamer2: 4}) )
        }

    }

    const comprobarVictoria = () => {

        let array = misCajas.map(x => x.square)
        let Ganador = false
        let combinacion = [0, 0, 0]

        if (array[0] === array[1] && array[1] === array[2] && array[0] !== null) { Ganador = true; combinacion = [0, 1, 2] }
        if (array[0] === array[3] && array[3] === array[6] && array[0] !== null) { Ganador = true; combinacion = [0, 3, 6] }
        if (array[0] === array[4] && array[4] === array[8] && array[0] !== null) { Ganador = true; combinacion = [0, 4, 8] }
        if (array[1] === array[4] && array[4] === array[7] && array[1] !== null) { Ganador = true; combinacion = [1, 4, 7] }
        if (array[2] === array[4] && array[4] === array[6] && array[2] !== null) { Ganador = true; combinacion = [2, 4, 6] }
        if (array[2] === array[5] && array[5] === array[8] && array[2] !== null) { Ganador = true; combinacion = [2, 5, 8] }
        if (array[3] === array[4] && array[4] === array[5] && array[3] !== null) { Ganador = true; combinacion = [3, 4, 5] }
        if (array[6] === array[7] && array[7] === array[8] && array[6] !== null) { Ganador = true; combinacion = [6, 7, 8] }

        return [Ganador, combinacion]
    }

    const renderSquare = i => {
        return <Square
            value={i}
            square={misCajas[i].square}
            actualiza={actualizaMarcador}
            jugador={jugador}
            ganador={[ganador, setGanador]}
            numJugadas={[numJugadas, setNumJugadas]}
            //reset={disparaReset}
        />
    }

    const reset = () => {

        let arrayLimpia = []
        
        for (let i = 0; i <= 8; i++) {
            arrayLimpia = [...arrayLimpia, { id: i, square: null }]
        }
        
        setMisCajas(arrayLimpia)
        setJugador('X')
        setGanador({ victoria: false, gamer: 'X', jugada: '0' })
        setDisparaReset(() => true)
        
        
        let newArray = [...estado]
        newArray[0] = {id: 0, jugador: "", winsGamer1: 0, winsGamer2: 0}
        setEstado(newArray)


    }

    const status = jugador

    return (
        <div>
            <div className="status" style={ganador.victoria === true ? styles.negrita : styles.empty}>
                {ganador.victoria ? 'Partida finalizada' : 'Siguiente jugador: '}
                <span className={jugador === 'X' ? 'jugador1 jugadorActual' : 'jugador2 jugadorActual'} style={ganador.victoria ? styles.desaparecer : styles.aparecer}>
                    {ganador.victoria !== true ? status : null}
                </span>
            </div>

            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>

            <div className={ganador.victoria ? 'ganador' + ganador.gamer + ' avisos' : 'avisos'}>
                {ganador.victoria ? '¡¡¡ Has ganado ' + ganador.gamer + ' !!!' : ''}
            </div>

            <div className={ganador.victoria ? 'botonReset' : 'invisible'} onClick={reset}>Volver a jugar</div>

        </div>
    )
}

export default Board