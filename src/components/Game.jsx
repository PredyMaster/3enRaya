import React, {useContext} from 'react'
import Board from './Board'
import Counter from './Counter'
import { AppContext } from '../provider/provider'
import './Game.css'

const Game = () => {
  const [estado] = useContext(AppContext)
  let newArray = [...estado]

  return (
    <div className="game">
      <Counter gamer='X' value={newArray[1].winsGamer1} />
      <div className="game-board">
        <Board />
      </div>
      <Counter gamer='O' value={newArray[1].winsGamer2} />
    </div>
  )

}

export default Game