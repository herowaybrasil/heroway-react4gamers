import React, { createContext, PropsWithChildren, useState } from 'react';
import { canvas, getNewPosition, ICanvas, IPosition } from '.';
import { EDirections } from '../../settings/constants';

interface IContext {
  canvas: ICanvas;
  getNewPosition: (direction: EDirections, currentPosition: IPosition) => IPosition;
}

export const CanvasContext = createContext<IContext>({
  canvas: [],
  getNewPosition: () => ({ x: 0, y: 0 }),
});

function CanvasProvider(props: PropsWithChildren<{}>) {
  const [canvasState, setCanvasState] = useState({
    canvas: canvas,
    getNewPosition: (direction: EDirections, currentPosition: IPosition) => {
      const newPosition = getNewPosition(direction, currentPosition);

      if (currentPosition !== newPosition) {
        updateCanvas(currentPosition, newPosition);
        return newPosition;
      }

      return currentPosition;
    },
  });

  function updateCanvas(currentPosition: IPosition, newPosition: IPosition) {
    const newCanvas = [...canvasState.canvas];
    const value = newCanvas[currentPosition.y][currentPosition.x];

    newCanvas[currentPosition.y][currentPosition.x] = 0;
    newCanvas[newPosition.y][newPosition.x] = value;

    setCanvasState({ ...canvasState, canvas: newCanvas });
  }

  return <CanvasContext.Provider value={canvasState}>{props.children}</CanvasContext.Provider>;
}

export default CanvasProvider;
