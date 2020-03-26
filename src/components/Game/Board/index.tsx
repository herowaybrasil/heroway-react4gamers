import React, { PropsWithChildren, useEffect, useState } from 'react';
import { ECanvas, ICanvas } from '../../../contexts/canvas/types';
import { GAME_SIZE } from '../../../settings/constants';
import Chest from '../Chest';
import Demon from '../Demon';
import Hero from '../Hero';
import MiniDemon from '../MiniDemon';
import Trap from '../Trap';
import Door from './Door';
import GameStatus from './GameStatus';

interface IProps {
  canvas: ICanvas;
}

function Board(props: PropsWithChildren<IProps>) {
  const [enemies, setEnemies] = useState<JSX.Element[]>([]);

  useEffect(() => {
    renderEnemies();

    function renderEnemies() {
      const canvas = props.canvas;
      const en = [];

      for (let y = 0; y < canvas.length; y++) {
        const canvasY = canvas[y];

        for (let x = 0; x < canvasY.length; x++) {
          const canvasYX = canvas[y][x];
          const position = { x: x, y: y };
          const key = `${x}-${y}`;

          if (canvasYX === ECanvas.TRAP) {
            en.push(<Trap key={key} position={position} />);
          }

          if (canvasYX === ECanvas.MINI_DEMON) {
            en.push(<MiniDemon key={key} initialPosition={position} />);
          }

          if (canvasYX === ECanvas.DEMON) {
            en.push(<Demon key={key} initialPosition={position} />);
          }

          if (canvasYX === ECanvas.CHEST) {
            en.push(<Chest key={key} position={position} />);
          }

          if (canvasYX === ECanvas.HERO) {
            en.push(<Hero key={key} initialPosition={position} />);
          }
        }
      }

      setEnemies(en);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <img src="./assets/tileset.gif" alt="Cenário" width={GAME_SIZE} height={GAME_SIZE} />

      <Door />
      <GameStatus />

      {props.children}
      {enemies}
    </>
  );
}

export default Board;
