import { EDirections } from '../../settings/constants';
import { ECanvas, ICanvas, IConsequences, IPosition, IWalker } from './types';

export function getInitialCanvas(): ICanvas {
  const {
    FLOOR: FL,
    WALL: WL,
    DOOR: DR,
    TRAP: TR,
    MINI_DEMON: MD,
    DEMON: DE,
    CHEST: CH,
    HERO: HE,
  } = ECanvas;

  return [
    [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, DR, DR, WL, WL, WL, WL, WL],
    [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, DR, DR, WL, WL, WL, WL, WL],
    [WL, FL, FL, WL, FL, FL, FL, FL, WL, FL, FL, FL, FL, FL, FL, FL, WL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, MD, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, CH, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, TR, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, TR, FL, DE, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, TR, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, TR, FL, FL, FL, FL, FL, FL, FL, FL, FL, CH, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, TR, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, MD, FL, WL],
    [WL, HE, WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL],
    [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL],
  ];
}

export function handleWalk(direction: EDirections, position: IPosition): IPosition {
  switch (direction) {
    case EDirections.UP:
      return { x: position.x, y: position.y - 1 };

    case EDirections.RIGHT:
      return { x: position.x + 1, y: position.y };

    case EDirections.DOWN:
      return { x: position.x, y: position.y + 1 };

    case EDirections.LEFT:
      return { x: position.x - 1, y: position.y };
  }
}

export function checkNextMoveIsValid(
  canvas: ICanvas,
  position: IPosition,
  walker: IWalker
): IConsequences {
  const pos: ECanvas = canvas[position.y][position.x] as ECanvas;

  if (walker === 'Hero') {
    return getHeroValidMoves(pos);
  }

  return getEnemyValidMoves(pos);
}

function getHeroValidMoves(pos: ECanvas) {
  const { FLOOR, DOOR, TRAP, CHEST, MINI_DEMON, DEMON } = ECanvas;

  return {
    valid: [FLOOR, TRAP, CHEST, MINI_DEMON, DEMON].includes(pos),
    dead: [TRAP, MINI_DEMON, DEMON].includes(pos),
    chest: CHEST === pos,
    door: DOOR === pos,
  };
}

function getEnemyValidMoves(pos: ECanvas) {
  return {
    valid: ECanvas.FLOOR === pos,
    dead: false,
    chest: false,
    door: false,
  };
}
