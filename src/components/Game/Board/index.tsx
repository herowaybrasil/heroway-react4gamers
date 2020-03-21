import React from 'react';
import boardIMG from '../../../assets/tileset.gif';
import { GAME_SIZE } from '../../../settings/constants';
import Chest from '../Chest';
import Demon from '../Demon';
import Hero from '../Hero';
import MiniDemon from '../MiniDemon';
import Trap from '../Trap';

interface IProps {
  canvas: number[][];
}

function Board(props: React.PropsWithChildren<IProps>) {
  function render() {
    const els = [];

    for (let y = 0; y < props.canvas.length; y++) {
      const canvasY = props.canvas[y];
      for (let x = 0; x < canvasY.length; x++) {
        const canvasYX = props.canvas[y][x];

        if (canvasYX === 2) {
          els.push(<Trap position={{ x: x, y: y }} />);
        }

        if (canvasYX === 3) {
          els.push(<MiniDemon initialPosition={{ x: x, y: y }} />);
        }

        if (canvasYX === 4) {
          els.push(<Demon initialPosition={{ x: x, y: y }} />);
        }

        if (canvasYX === 5) {
          els.push(<Chest position={{ x: x, y: y }} />);
        }

        if (canvasYX === 6) {
          els.push(<Hero initialPosition={{ x: x, y: y }} />);
        }
      }
    }

    return els;
  }

  const els = render();

  return (
    <>
      <img src={boardIMG} alt="Cenário" width={GAME_SIZE} height={GAME_SIZE} />
      {props.children}
      {els}
    </>
  );
}

export default Board;
