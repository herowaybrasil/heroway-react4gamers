import useInterval from '@use-it/interval';
import { useContext, useState } from 'react';
import { EDirections } from '../../settings/constants';
import { IPosition } from '../canvas';
import { CanvasContext } from '../canvas/canvas.context';

export default function useEnemyMoviment(initialPositions: IPosition) {
  const [position, setPosition] = useState<IPosition>(initialPositions);
  const [direction, setDirection] = useState<EDirections>(EDirections.LEFT);
  const { getNewPosition } = useContext(CanvasContext);

  useInterval(move, 1000);

  function move() {
    const directions = Object.values(EDirections);
    const random = Math.floor(Math.random() * directions.length);
    const keyDirection = directions[random];

    const newPosition = getNewPosition(keyDirection, position);
    setPosition(newPosition);

    if (keyDirection === EDirections.LEFT || keyDirection === EDirections.RIGHT) {
      setDirection(keyDirection);
    }
  }

  return { position, direction };
}
