import React from 'react';
import { IPosition } from '../../../services/moviment';
import useHeroMoviment from '../../../services/useHeroMoviment';
import { HELMET_OFFSET, TILE_SIZE } from '../../../settings/constants';
import './Player.css';

interface IProps {
  initialPosition: IPosition;
}

function Hero(props: IProps) {
  const { position, direction } = useHeroMoviment(props.initialPosition);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.y * TILE_SIZE - HELMET_OFFSET}px`,
        left: `${position.x * TILE_SIZE}px`,
        width: TILE_SIZE,
        height: TILE_SIZE + HELMET_OFFSET,
        backgroundImage: `url(./assets/hero.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `0px -${TILE_SIZE - HELMET_OFFSET}px`,
        animation: 'player 1s steps(4) infinite',
        transform: `scaleX(${direction === 'LEFT' ? -1 : 1})`,
      }}
    />
  );
}

export default Hero;
