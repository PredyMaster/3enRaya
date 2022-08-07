const Counter = ({gamer, value}) => {

    return(
        <div className="counter">
            <h2 className={gamer==='X' ? 'jugador1 counterGamer' : 'jugador2 counterGamer'}>{gamer}</h2>
            <h3 className="wins">WINS</h3>
            <p className="numberWins">{value}</p>
        </div>
    ) 
}

export default Counter