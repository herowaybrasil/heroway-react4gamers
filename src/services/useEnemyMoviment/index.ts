import { useEffect, useState } from 'react';
import { EDirections } from '../../settings/constants';
import { checkNextMoveIsValid, getNewPosition, IPosition } from '../moviment';

export default function useEnemyMoviment(initialPositions: IPosition, sqm?: number) {
  const [position, setPosition] = useState<IPosition>(initialPositions);
  const [direction, setDirection] = useState<EDirections>(EDirections.LEFT);

  useEffect(() => {
    function move() {
      const directions = Object.values(EDirections);
      const random = Math.floor(Math.random() * directions.length);
      const keyDirection = directions[random];

      const newPosition = getNewPosition(keyDirection, position);
      const nextMoveIsAllowed = checkNextMoveIsValid(newPosition, sqm);

      if (nextMoveIsAllowed) {
        setPosition(newPosition);

        if (keyDirection === EDirections.LEFT || keyDirection === EDirections.RIGHT) {
          setDirection(keyDirection);
        }
      }
    }

    // setTimeout(move, 1000);
  }, [position, sqm]);

  return { position, direction };
}
