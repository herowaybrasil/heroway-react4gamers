import React, { PropsWithChildren, useEffect, useState } from 'react';
import { ICanvas } from '../../../services/canvas/helpers';
import Tile from './Tile';

interface IProps {
  canvas: ICanvas;
  enabled: boolean;
}

function Debugger(props: PropsWithChildren<IProps>) {
  const [tiles, setTiles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    function loadTiles() {
      const t = [];
      const canvas = props.canvas;

      for (let y = 0; y < canvas.length; y++) {
        const canvasY = canvas[y];

        for (let x = 0; x < canvasY.length; x++) {
          const key = `${x}-${y}`;
          const canvasYX = canvas[y][x];
          const position = { x: x, y: y };

          t.push(<Tile key={key} canvasId={canvasYX} position={position} />);
        }
      }

      setTiles(t);
    }

    if (props.enabled) {
      loadTiles();
    }
  }, [props.canvas, props.enabled]);

  return (
    <>
      {props.children}
      {props.enabled && tiles}
    </>
  );
}

export default Debugger;
