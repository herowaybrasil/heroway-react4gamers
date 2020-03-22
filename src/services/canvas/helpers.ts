import { EDirections } from '../../settings/constants';

export type IWalker = 'Hero' | 'Enemy';

export interface IPosition {
  x: number;
  y: number;
}

export interface IMoveBlah {
  valid: boolean;
  dead: boolean;
  chest: boolean;
  door: boolean;
}

export interface INewPosition {
  position: IPosition;
  nextMoveIsAllowed: IMoveBlah;
}

export enum ECanvas {
  FLOOR = 0, // Espaços Disponíveis para movimento
  WALL = 1, // Parede
  DOOR = 2, // Porta
  TRAP = 3, // Armadilha
  MINI_DEMON = 4, // MiniDemon
  DEMON = 5, // Demon
  DEMON_OFFSET = 6, // Demon Offset
  CHEST = 7, // Baú
  HERO = 8, // Hero
}

export type ICanvas = ECanvas[][];

export function getInitialCanvas(): ICanvas {
  const {
    FLOOR: FL,
    WALL: WL,
    DOOR: DR,
    TRAP: TR,
    MINI_DEMON: MD,
    DEMON: DE,
    DEMON_OFFSET: DO,
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
): IMoveBlah {
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
