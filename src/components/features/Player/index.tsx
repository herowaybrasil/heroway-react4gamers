import React from "react";
import characters from '../../../assets/characters.png';
import { SIZE } from "../../../settings/constants";
import useMoviment from "./use-moviment";
import useWalker from "./use-walker";

function Character() {
  const offset = { left: 0, top: 0 };
  const { facing, step } = useWalker();
  const { position } = useMoviment();

  console.log(position);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: SIZE,
        height: SIZE,
        background: `url(${characters}) -${offset.left + step * SIZE}px -${offset.top + facing.current}px`
      }}
    />
  )
}

export default Character;
