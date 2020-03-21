import React, { useState } from 'react';
import { canvas } from '../../services/moviment';
import Board from './Board';
import Debugger from './Debugger';

// <MiniDemon initialPosition={{ x: 11, y: 3 }} />
// <Chest position={{ x: 3, y: 5 }} />
// <Trap position={{ x: 10, y: 6 }} />

// <Trap position={{ x: 8, y: 8 }} />
// <Demon initialPosition={{ x: 10, y: 8 }} />

// <Trap position={{ x: 16, y: 12 }} />
// <Trap position={{ x: 7, y: 14 }} />
// <Chest position={{ x: 17, y: 14 }} />
// <Trap position={{ x: 13, y: 15 }} />
// <MiniDemon initialPosition={{ x: 17, y: 16 }} />
// <Hero initialPosition={{ x: 1, y: 17 }} />

function Game() {
  const [debug, setDebug] = useState(true);

  return (
    <>
      <button
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          padding: 10,
          border: '1px solid white',
          fontSize: 18,
          color: 'white',
          background: 'red',
          cursor: 'pointer',
          zIndex: 1,
        }}
        onClick={() => setDebug(!debug)}
      >
        DEBUG
      </button>

      <Debugger enabled={debug} canvas={canvas}>
        <Board canvas={canvas} />
      </Debugger>
    </>
  );
}

export default Game;
