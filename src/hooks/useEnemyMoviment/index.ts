import useInterval from '@use-it/interval';
import { useContext, useState } from 'react';
import { CanvasContext } from '../../services/canvas';
import { IPosition } from '../../services/canvas/helpers';
import { EDirections } from '../../settings/constants';

export default function useEnemyMoviment(initialPositions: IPosition) {
  const [position, setPosition] = useState<IPosition>(initialPositions);
  const [direction, setDirection] = useState<EDirections>(EDirections.LEFT);
  const { updateCanvas } = useContext(CanvasContext);

  useInterval(move, 1000);

  function move() {
    const directions = Object.values(EDirections);
    const random = Math.floor(Math.random() * directions.length);
    const keyDirection = directions[random];

    const status = updateCanvas(keyDirection, position, 'Enemy');
    setPosition(status.position);

    if (keyDirection === EDirections.LEFT || keyDirection === EDirections.RIGHT) {
      setDirection(keyDirection);
    }
  }

  return { position, direction };
}
