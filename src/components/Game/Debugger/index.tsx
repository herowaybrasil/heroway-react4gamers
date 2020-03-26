import React, { PropsWithChildren, useEffect, useState } from 'react';
import { INITIAL_CANVAS_MAP } from '../../../contexts/canvas/helpers';
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
      const tilesMap = Object.keys(INITIAL_CANVAS_MAP).map((key) => {
        const { tile, position } = INITIAL_CANVAS_MAP[key];

        return <Tile key={key} tileId={tile} position={position} />

      });

      setTiles(tilesMap);
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
