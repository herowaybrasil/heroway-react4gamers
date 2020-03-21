import React from 'react';
import { IPosition } from '../../../services/moviment';
import useHeroMoviment from '../../../services/useHeroMoviment';
import { DEMON_TILE_SIZE, TILE_SIZE } from '../../../settings/constants';
import './Demon.css';

interface IProps {
  initialPosition: IPosition;
}

function Demon(props: IProps) {
  const { position, direction } = useHeroMoviment(props.initialPosition, 2);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.y * TILE_SIZE}px`,
        left: `${position.x * TILE_SIZE}px`,
        width: DEMON_TILE_SIZE,
        height: DEMON_TILE_SIZE,
        backgroundImage: `url(./assets/demon.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `0px 0px`,
        animation: 'demon 1s steps(4) infinite',
        transform: `scaleX(${direction === 'LEFT' ? -1 : 1})`,
      }}
    />
  );
}

export default Demon;
