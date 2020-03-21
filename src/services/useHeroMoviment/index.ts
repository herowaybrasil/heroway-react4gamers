import useEventListener from '@use-it/event-listener';
import { useContext, useState } from 'react';
import { EDirections } from '../../settings/constants';
import { IPosition } from '../canvas';
import { CanvasContext } from '../canvas/canvas.context';

export default function useHeroMoviment(initialPositions: IPosition) {
  const [position, setPosition] = useState<IPosition>(initialPositions);
  const [direction, setDirection] = useState<EDirections>(EDirections.LEFT);
  const { getNewPosition } = useContext(CanvasContext);

  useEventListener<React.KeyboardEvent<HTMLDivElement>>('keydown', event => {
    const { key } = event;

    if (key.indexOf('Arrow') === -1) {
      return;
    }

    const keyDirection = key.replace('Arrow', '').toUpperCase() as EDirections;
    const newPosition = getNewPosition(keyDirection, position);
    setPosition(newPosition);

    if (keyDirection === EDirections.LEFT || keyDirection === EDirections.RIGHT) {
      setDirection(keyDirection);
    }
  });

  return { position, direction };
}
