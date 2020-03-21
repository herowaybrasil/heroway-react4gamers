import React from 'react';
import './App.css';
import Board from './features/Board';
import Character from './features/Player';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board />
        <Character />
      </header>
    </div>
  );
}

export default App;
