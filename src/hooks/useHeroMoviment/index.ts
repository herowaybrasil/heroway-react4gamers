import useEventListener from '@use-it/event-listener';
import { useContext, useState } from 'react';
import { CanvasContext } from '../../services/canvas';
import { IPosition } from '../../services/canvas/types';
import { ChestsContext } from '../../services/chests';
import { EDirections } from '../../settings/constants';

export default function useHeroMoviment(initialPositions: IPosition) {
  const [position, setPosition] = useState<IPosition>(initialPositions);
  const [direction, setDirection] = useState<EDirections>(EDirections.LEFT);
  const { updateCanvas } = useContext(CanvasContext);
  const { updateOpenedChests, openedChests, totalChests } = useContext(ChestsContext);

  useEventListener<React.KeyboardEvent<HTMLDivElement>>('keydown', event => {
    if (event.key.indexOf('Arrow') === -1) {
      return;
    }

    const keyDirection = event.key.replace('Arrow', '').toUpperCase() as EDirections;
    const movement = updateCanvas(keyDirection, position, 'Hero');
    setPosition(movement.position);

    if (keyDirection === EDirections.LEFT || keyDirection === EDirections.RIGHT) {
      setDirection(keyDirection);
    }

    if (movement.consequences.dead) {
      console.log('Você morreu!');
    }

    if (movement.consequences.chest) {
      updateOpenedChests(movement.position);
    }

    if (totalChests === openedChests.total && movement.consequences.door) {
      console.log('você ganhou!');
    }
  });

  return { position, direction };
}
