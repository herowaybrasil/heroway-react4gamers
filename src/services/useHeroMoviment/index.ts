import useEventListener from '@use-it/event-listener';
import { useState } from 'react';
import { EDirections } from '../../settings/constants';
import { checkNextMoveIsValid, getNewPosition, IPosition } from '../moviment';

// ---------------------- //

export default function useHeroMoviment(initialPositions: IPosition, sqm?: number) {
  const [position, setPosition] = useState<IPosition>(initialPositions);
  const [direction, setDirection] = useState<EDirections>(EDirections.LEFT);

  useEventListener<React.KeyboardEvent<HTMLDivElement>>('keydown', event => {
    const { key } = event;

    if (key.indexOf('Arrow') === -1) {
      return;
    }

    const keyDirection = key.replace('Arrow', '').toUpperCase() as EDirections;
    const newPosition = getNewPosition(keyDirection, position);
    const nextMoveIsAllowed = checkNextMoveIsValid(newPosition, sqm);

    if (nextMoveIsAllowed) {
      setPosition(newPosition);

      if (keyDirection === EDirections.LEFT || keyDirection === EDirections.RIGHT) {
        setDirection(keyDirection);
      }
    }
  });

  return { position, direction };
}
