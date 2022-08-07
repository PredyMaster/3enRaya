import React from 'react'
import Board from './Board'
import Counter from './Counter'
import './Game.css'

const Game = () => {

  return (
    <div className="game">
      <Counter gamer='X' value='0' />
      <div className="game-board">
        <Board />
      </div>
      <Counter gamer='O' value='0' />
    </div>
  )

}

export default Game