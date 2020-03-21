import React from 'react';
import boardIMG from '../../../assets/tileset.gif';
import { GAME_SIZE } from '../../../settings/constants';

function Board(props: React.PropsWithChildren<{}>) {
  return (
    <>
      <img src={boardIMG} alt="Cenário" width={GAME_SIZE} height={GAME_SIZE} />
      {props.children}
    </>
  );
}

export default Board;
