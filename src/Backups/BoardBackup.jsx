import { useState, useContext } from 'react';
import Square from './Square';
import {AppContext} from '../provider/provider';


const styles = {
    desaparecer: {
        display: 'none'
    },
    aparecer: {
        display: 'inline-block'
    },
    negrita: {
        fontSize: '1.4rem',
        letterSpacing: '1px'
    },
    empty: {}
}

const Board = () => {
    const [estado,setEstado] = useContext(AppContext);

    const [ganador, setGanador] = useState([{victoria: false, gamer: 'X', jugada: [0,0,0]}])
    const [numJugadas, setNumJugadas] = useState([{ tablas: false, numeroJugadas: 0}]);
    const [jugador, setJugador] = useState('X');
    const [disparaReset, setDisparaReset] = useState(false);
    const [misCajas, setMisCajas] = useState([
        {id: 0, square: null},
        {id: 1, square: null},
        {id: 2, square: null},
        {id: 3, square: null},
        {id: 4, square: null},
        {id: 5, square: null},
        {id: 6, square: null},
        {id: 7, square: null},
        {id: 8, square: null}
    ]);


    const actualizaMarcador = (id) => {

        if (ganador.victoria !== true) {
            let arrayPosiciones = [...misCajas];
            let nuevasPosiciones = arrayPosiciones.map(x => {
                if (x.id === id) {
                    x.square = jugador;
                }
                return x;
            })

            
            console.log(numJugadas);
            //console.log(numJugadas[0].numeroJugadas);
            //console.log(numJugadas[0].tablas);
            console.log(numJugadas[0].numeroJugadas);
            
            //let proxValor = parseInt(numJugadas[0].numeroJugadas);
            let proxValor = numJugadas[0].numeroJugadas;
            proxValor++;    
            console.log("proxValor: " + proxValor);

            //setNumJugadas({ tablas: false, numeroJugadas: proxValor });
            //setNumJugadas({ tablas: false, numeroJugadas: (numJugadas[0].numeroJugadas)+1});

            
            setMisCajas(nuevasPosiciones);
            jugador === 'X' ? setJugador('O') : setJugador('X');
            setGanador({ victoria: comprobarVictoria()[0], gamer: jugador, jugada: comprobarVictoria()[1] })
        }

    }

    const comprobarVictoria = () => {

        let array = misCajas.map(x => x.square);
        let Ganador = false;
        let combinacion = [0,0,0]

        if (array[0] === array[1] && array[1] === array[2] && array[0] !== null ){ Ganador=true; combinacion = [0,1,2]}
        if (array[0] === array[3] && array[3] === array[6] && array[0] !== null ){ Ganador=true; combinacion = [0,3,6]}
        if (array[0] === array[4] && array[4] === array[8] && array[0] !== null ){ Ganador=true; combinacion = [0,4,8]} 
        if (array[1] === array[4] && array[4] === array[7] && array[1] !== null ){ Ganador=true; combinacion = [1,4,7]} 
        if (array[2] === array[4] && array[4] === array[6] && array[2] !== null ){ Ganador=true; combinacion = [2,4,6]} 
        if (array[2] === array[5] && array[5] === array[8] && array[2] !== null ){ Ganador=true; combinacion = [2,5,8]} 
        if (array[3] === array[4] && array[4] === array[5] && array[3] !== null ){ Ganador=true; combinacion = [3,4,5]} 
        if (array[6] === array[7] && array[7] === array[8] && array[6] !== null ){ Ganador=true; combinacion = [6,7,8]} 

        return [Ganador, combinacion];
    }

    const renderSquare = (i) => {
        return <Square 
                    value={i} 
                    square={misCajas[i].square} 
                    actualiza={actualizaMarcador} 
                    jugador={jugador}
                    ganador={[ganador, setGanador]} 
                    reset={disparaReset}
                    numJugadas = {[numJugadas, setNumJugadas]}
                />;
    }

    const reset = () => {

        let arrayLimpia = [];
        /* let todasLasCasillas = document.querySelectorAll('.square span'); */

        for(let i=0; i<=8; i++ ){
            console.log(arrayLimpia, " -- arrayLimpia dentro ")
            arrayLimpia = [...arrayLimpia, {id: i, square: null}];
            /* todasLasCasillas[i].innerHTML = '';
            todasLasCasillas[i].classList.remove('jugador1ICON');
            todasLasCasillas[i].classList.add('jugador2ICON');; */
        }
        console.log(arrayLimpia, " -- arrayLimpia Fuera ")
        setMisCajas(arrayLimpia);
        setJugador('X');
        setGanador({victoria: false, gamer: 'X', jugada: '0'});
        console.log(disparaReset, "disparaReset antes")
        setDisparaReset(()=>true);
        console.log(disparaReset, "disparaReset despues")
        

    }

    const status = jugador;

    return(
        <div>
            {/* console.log("---- disparaReset: " + disparaReset), 
            console.log(ganador.jugada)*/
            }
        <div className="status" style={ganador.victoria === true ? styles.negrita : styles.empty}>
            {ganador.victoria === true ? 'Partida finalizada' : 'Siguiente jugador: '}
            <span className= {jugador==='X'?'jugador1 jugadorActual':'jugador2 jugadorActual'} style={ganador.victoria === true ? styles.desaparecer : styles.aparecer}>
                { ganador.victoria !== true ? status : null }
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
            {ganador.victoria ? '¡¡¡ Has ganado '+ ganador.gamer + ' !!!' : '' }
        </div>

        <div className={ganador.victoria ? 'botonReset' : 'invisible'} onClick={reset}>Volver a jugar</div>


        {/* <div>
            { misCajas.map( e =>
                <div className="cajitasTest" key={e.id + "aaa"}>
                    <div key={e.id}>{ e.id }</div>
                    <div key={e.id + "e"}>{ e.square }</div> 
                </div>                
            ) }
        </div> */}
        
      </div>
    )
}

export default Board;