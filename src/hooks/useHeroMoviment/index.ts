import useEventListener from '@use-it/event-listener';
import { useContext, useState } from 'react';
import { CanvasContext } from '../../services/canvas';
import { IPosition } from '../../services/canvas/helpers';
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
    const status = updateCanvas(keyDirection, position, 'Hero');
    setPosition(status.position);

    if (keyDirection === EDirections.LEFT || keyDirection === EDirections.RIGHT) {
      setDirection(keyDirection);
    }

    if (status.nextMoveIsAllowed.dead) {
      console.log('Você morreu!');
    }

    if (status.nextMoveIsAllowed.chest) {
      updateOpenedChests(status.position);
    }

    if (totalChests === openedChests.total && status.nextMoveIsAllowed.door) {
      console.log('você ganhou!');
    }
  });

  return { position, direction };
}
