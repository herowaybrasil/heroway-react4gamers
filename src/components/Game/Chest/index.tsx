import React from 'react';
import { IPosition } from '../../../services/moviment';
import { TILE_SIZE } from '../../../settings/constants';

interface IProps {
  position: IPosition;
}

function Chest(props: IProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${props.position.y * TILE_SIZE}px`,
        left: `${props.position.x * TILE_SIZE}px`,
        width: TILE_SIZE,
        height: TILE_SIZE,
        backgroundImage: `url(./assets/chest.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `0px 0px`,
        // animation: 'player 1s steps(4) infinite',
      }}
    />
  );
}

export default Chest;
