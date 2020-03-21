import React from 'react';
import Board from './Board';
import Chest from './Chest';
import Demon from './Demon';
import Hero from './Hero';
import MiniDemon from './MiniDemon';
import Trap from './Trap';

function Game() {
  return (
    <Board>
      <MiniDemon initialPosition={{ x: 11, y: 3 }} />
      <Chest position={{ x: 3, y: 5 }} />
      <Trap position={{ x: 10, y: 6 }} />

      <Trap position={{ x: 8, y: 8 }} />
      <Demon initialPosition={{ x: 10, y: 8 }} />

      <Trap position={{ x: 16, y: 12 }} />
      <Trap position={{ x: 7, y: 14 }} />
      <Chest position={{ x: 17, y: 14 }} />
      <Trap position={{ x: 13, y: 15 }} />
      <MiniDemon initialPosition={{ x: 17, y: 16 }} />
      <Hero initialPosition={{ x: 1, y: 17 }} />
    </Board>
  );
}

export default Game;
