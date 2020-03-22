import React, { createContext, PropsWithChildren, useState } from 'react';
import { IPosition } from '../canvas/types';
import { IChestsContext } from './types';

export const ChestsContext = createContext<IChestsContext>({
  totalChests: 0,
  openedChests: { total: 0, positions: [] },
  updateOpenedChests: () => null,
});

function ChestsProvider(props: PropsWithChildren<{}>) {
  const [chestsState, setChestsState] = useState({
    totalChests: 2,
    openedChests: {
      total: 0,
      positions: [] as IPosition[],
    },
    updateOpenedChests: (position: IPosition) => {
      setChestsState(prevState => ({
        ...prevState,
        openedChests: {
          total: prevState.openedChests.total + 1,
          positions: [...prevState.openedChests.positions, position],
        },
      }));
    },
  });

  return <ChestsContext.Provider value={chestsState}>{props.children}</ChestsContext.Provider>;
}

export default ChestsProvider;
