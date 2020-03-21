import React, { PureComponent } from 'react';
import { ECanvas, ICanvas } from '../../../services/canvas';
import { GAME_SIZE } from '../../../settings/constants';
import Chest from '../Chest';
import Demon from '../Demon';
import Hero from '../Hero';
import MiniDemon from '../MiniDemon';
import Trap from '../Trap';

interface IProps {
  canvas: ICanvas;
}

class Board extends PureComponent<IProps> {
  state = { enemies: undefined };

  componentDidMount() {
    this.renderEnemies();
  }

  renderEnemies = () => {
    const canvas = this.props.canvas;
    const enemies = [];

    for (let y = 0; y < canvas.length; y++) {
      const canvasY = canvas[y];

      for (let x = 0; x < canvasY.length; x++) {
        const canvasYX = canvas[y][x];
        const position = { x: x, y: y };
        const key = `${x}-${y}`;

        if (canvasYX === ECanvas.TRAP) {
          enemies.push(<Trap key={key} position={position} />);
        }

        if (canvasYX === ECanvas.MINI_DEMON) {
          enemies.push(<MiniDemon key={key} initialPosition={position} />);
        }

        if (canvasYX === ECanvas.DEMON) {
          enemies.push(<Demon key={key} initialPosition={position} />);
        }

        if (canvasYX === ECanvas.CHEST) {
          enemies.push(<Chest key={key} position={position} />);
        }

        if (canvasYX === ECanvas.HERO) {
          enemies.push(<Hero key={key} initialPosition={position} />);
        }
      }
    }

    this.setState({ enemies });
  };

  render() {
    return (
      <>
        <img src="./assets/tileset.gif" alt="Cenário" width={GAME_SIZE} height={GAME_SIZE} />
        {this.props.children}
        {this.state.enemies}
      </>
    );
  }
}

export default Board;
