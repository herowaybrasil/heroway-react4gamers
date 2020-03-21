import useEventListener from "@use-it/event-listener";
import { useState } from "react";

interface IPosition {
  x: number;
  y: number;
}

function getNewPosition(direction: string, oldPosition: IPosition): IPosition {
  switch (direction) {
    case 'UP':
      return { x: oldPosition.x, y: oldPosition.y - 48 };

    case 'RIGHT':
      return { x: oldPosition.x + 48, y: oldPosition.y };

    case 'DOWN':
      return { x: oldPosition.x, y: oldPosition.y + 48 };

    case 'LEFT':
      return { x: oldPosition.x - 48, y: oldPosition.y };

    default:
      return oldPosition;
  }
}

export default function useMoviment() {
  const [position, setPosition] = useState<IPosition>({ x: 815, y: 45 });

  useEventListener<React.KeyboardEvent<HTMLDivElement>>("keydown", (event) => {
    const { key } = event;

    if (key.indexOf("Arrow") === -1) {
      return;
    }

    const keyDirection = key.replace("Arrow", "").toUpperCase();
    const newPosition = getNewPosition(keyDirection, position);

    setPosition(newPosition);
  });

  return { position };
}
