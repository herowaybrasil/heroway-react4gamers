import React, { createContext, PropsWithChildren, useState } from 'react';
import { EDirections } from '../../settings/constants';
import { checkNextMoveIsValid, getInitialCanvas, handleWalk } from './helpers';
import { ECanvas, ICanvas, ICanvasMoviment, IPosition, IWalker } from './types';

export interface ICanvasContext {
  canvas: ICanvas;
  updateCanvas: (
    direction: EDirections,
    currentPosition: IPosition,
    walker: IWalker
  ) => ICanvasMoviment;
}

export const CanvasContext = createContext<ICanvasContext>({
  canvas: [],
  updateCanvas: () => null as any,
});

function CanvasProvider(props: PropsWithChildren<{}>) {
  const [canvasState, setCanvasState] = useState<ICanvasContext>({
    canvas: getInitialCanvas(),
    updateCanvas: (
      direction: EDirections,
      currentPosition: IPosition,
      walker: IWalker
    ): ICanvasMoviment => {
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
        consequences: nextMove,
        position: nextMove.valid ? nextPosition : currentPosition,
      };
    },
  });

  return <CanvasContext.Provider value={canvasState}>{props.children}</CanvasContext.Provider>;
}

export default CanvasProvider;
