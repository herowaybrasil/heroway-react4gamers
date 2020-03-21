import useInterval from '@use-it/interval';
import { useState } from 'react';
import { EDirections } from '../../settings/constants';
import { getNewPosition, IPosition } from '../moviment';

export default function useEnemyMoviment(initialPositions: IPosition) {
  const [position, setPosition] = useState<IPosition>(initialPositions);
  const [direction, setDirection] = useState<EDirections>(EDirections.LEFT);

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
