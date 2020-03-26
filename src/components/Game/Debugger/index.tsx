import React, { PropsWithChildren, useEffect, useState } from 'react';
import { ICanvas } from '../../../contexts/canvas/types';
import Tile from './Tile';

interface IProps {
  canvas: ICanvas;
}

function Debugger(props: PropsWithChildren<IProps>) {
  const [tiles, setTiles] = useState<JSX.Element[]>([]);

  const [debug, setDebug] = useState<boolean>(false);


  useEffect(() => {
    if (debug) {
      loadTiles();
    }

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
  }, [props.canvas, debug]);

  return (
    <>
      <button
        style={{
          position: 'absolute',
          top: 5,
          right: 0,
          padding: 10,
          border: '1px solid white',
          fontSize: 18,
          color: 'white',
          background: 'red',
          cursor: 'pointer',
          zIndex: 3,
        }}
        onClick={() => setDebug(!debug)}
      >
        DEBUG
      </button>

      {props.children}
      {debug && tiles}
    </>
  );
}

export default Debugger;
