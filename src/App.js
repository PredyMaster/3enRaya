import React from 'react'
import Game from './components/Game'
import Provider from './provider/provider'

function App() {

  return (
    <Provider>
        <Game />      
    </Provider>
  );

}

export default App
