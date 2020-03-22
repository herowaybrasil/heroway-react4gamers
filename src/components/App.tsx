import React from 'react';
import CanvasProvider from '../services/canvas';
import ChestsProvider from '../services/chests';
import { GAME_SIZE } from '../settings/constants';
import './App.css';
import Game from './Game';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ width: GAME_SIZE, height: GAME_SIZE }}>
        <CanvasProvider>
          <ChestsProvider>
            <Game />
          </ChestsProvider>
        </CanvasProvider>
      </header>
    </div>
  );
}

export default App;
