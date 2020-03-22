import React, { createContext, PropsWithChildren, useState } from 'react';
import { EDirections } from '../../settings/constants';
import {
  checkNextMoveIsValid,
  ECanvas,
  getInitialCanvas,
  handleWalk,
  ICanvas,
  IMoveBlah,
  INewPosition,
  IPosition,
  IWalker,
} from './helpers';

interface IContext {
  canvas: ICanvas;
  updateCanvas: (
    direction: EDirections,
    currentPosition: IPosition,
    walker: IWalker
  ) => {
    position: IPosition;
    nextMoveIsAllowed: IMoveBlah;
  };
}

export const CanvasContext = createContext<IContext>({
  canvas: [],
  updateCanvas: () => null as any,
});

function CanvasProvider(props: PropsWithChildren<{}>) {
  const [canvasState, setCanvasState] = useState<IContext>({
    canvas: getInitialCanvas(),
    updateCanvas,
  });

  function updateCanvas(
    direction: EDirections,
    currentPosition: IPosition,
    walker: IWalker
  ): INewPosition {
    const nextPosition = handleWalk(direction, currentPosition);
    const nextMove = checkNextMoveIsValid(canvasState.canvas, nextPosition, walker);

    if (nextMove.valid) {
      setCanvasState(prevState => {
        const newCanvas = [...prevState.canvas];
        const currentValue = newCanvas[currentPosition.y][currentPosition.x] as ECanvas;

        newCanvas[currentPosition.y][currentPosition.x] = ECanvas.FLOOR;
        newCanvas[nextPosition.y][nextPosition.x] = currentValue;

        return {
          ...prevState,
          canvas: newCanvas,
        };
      });
    }

    return {
      nextMoveIsAllowed: nextMove,
      position: nextMove.valid ? nextPosition : currentPosition,
    };
  }

  return <CanvasContext.Provider value={canvasState}>{props.children}</CanvasContext.Provider>;
}

export default CanvasProvider;
